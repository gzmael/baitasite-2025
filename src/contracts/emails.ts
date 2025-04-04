import { ClientItem } from './clients'
import { Item } from './itens'

export interface AttachmentMail {
  content?: string | Buffer
  filename?: string | false
}

export type NewInvoiceMail = {
  client: ClientItem
  items: Item[]
  alert?: string
  dueDate: string
  emitDate: string
  reference: string
  nfse: string | null
}
