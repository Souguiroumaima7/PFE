import { environment } from "src/environments/environment"

export const baseUrl = environment.production ? 'https://api.ecommerce.com' : 'http://localhost:4000'
export const productsUrl = baseUrl + '/products'
export const cartUrl = baseUrl + '/cart'
