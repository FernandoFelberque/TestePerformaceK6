import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Customer {
    list(token) {
        let response = http.get(`${Utils.getBaseUrl()}/costumers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'listagem de info do cliente deve retornar 200': r => r && r.status === 200 })
    }
}