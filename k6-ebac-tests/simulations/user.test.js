import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json'
import User from '../request/user.request';
import Product from '../request/product.request';
import Customer from '../request/customer.request';

export const options = {
  stages: [
    { duration: '15s', target: 15 },
    { duration: '5s', target: 50 },
    { duration: '15s', target: 15 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']
  }
}

export default function () {

  let login = new Login()
  let user = new User()
  let product = new Product()
  let customer = new Customer()

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass)
  })

  group('list users, Products and customers', () => {
    user.list(login.getToken())
    product.list(login.getToken())
    customer.list(login.getToken())
  })

}
