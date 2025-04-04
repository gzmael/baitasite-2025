export type ClientWithInvoiceData = {
  id: string
  name: string
  host: string
  document: string | null
  idNumber: number
  plansOnClient: {
    id: string
    quantity: number
    plan: {
      name: string
      price: number
    }
  }[]
  user: {
    name: string
    email: string | null
  }
  address: {
    number: string | null
    neighborhood: string | null
    city: string
    street: string
    uf: string
    zipcode: string
  } | null
}

export interface ClientItem {
  idNumber: string
  name: string
  cnpj: string
  address1: string
  address2: string
  domain: string
}
