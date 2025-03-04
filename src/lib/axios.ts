import axios from 'axios'

export const apiInter = axios.create({
  baseURL: 'https://cdpj.partners.bancointer.com.br',
})

export const apiLocal = axios.create({
  baseURL: '/api',
})
