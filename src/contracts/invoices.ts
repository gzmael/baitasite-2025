export type NewBoleto = {
  seuNumero: string
  valorNominal: number
  dataVencimento: string
  numDiasAgenda: number
  pagador: {
    cpfCnpj: string
    tipoPessoa: 'FISICA' | 'JURIDICA'
    nome: string
    endereco: string
    numero?: string
    bairro?: string
    cidade: string
    uf: string
    cep: string
    email?: string
    ddd?: string
    telefone?: string
  }
  messagem: {
    linha1: string
    linha2?: string
  }
  beneficiarioFinal?: {
    nome: string
    cpfCnpj: string
    tipoPessoa: 'FISICA' | 'JURIDICA'
    endereco: string
    bairro: string
    cidade: string
    uf: string
    cep: string
  }
}

export type SolicitacaoResponse = {
  cobranca: {
    seuNumero: string
    codigoSolicitacao: string
  }
  boleto: {
    nossoNumero: string
    codigoBarras: string
    linhaDigitavel: string
  }
  pix: {
    txid: string
    pixCopiaECola: string
  }
}

export type NewBoletoPixResponse = {
  codigoSolicitacao: string
}

export interface CreateInvoiceDTO {
  amount: number
  due_date: Date
  reference: string
  client_id: string
  nossoNumero?: string
  digitableLine?: string
  txid?: string
  pixCopiaECola?: string
  barCode?: string
  codigoSolicitacao?: string
  planClientIds: {
    plansOnClientId: string
  }[]
}
