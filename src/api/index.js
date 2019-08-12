import Vue from 'vue'
import axios from 'axios'

let api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// Request interceptor
api.interceptors.request.use(
  config => config,
  error => {
    console.warn(`error creating request`)
    return Promise.reject(error)
  })

// Response interceptor
api.interceptors.response.use(
  response => {
    console.debug(`[${response.config.method}][${response.status}] ${response.request.responseURL}`)
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('resource you are looking for not found, {401} error')
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.warn('connection error')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('request error')
    }
    return Promise.reject(error)
  })

// Endpoints
api.endpoints = {
  customers () {
    return api.get(`/customers`)
  },
  orders (customerId, params = {}) {
    return api.get(`/orders/${customerId}`, { params })
  }
}

Vue.prototype.$api = api

export default api
