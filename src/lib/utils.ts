import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import { ClientWithInvoiceData } from '@/contracts/clients'
import { NewBoleto } from '@/contracts/invoices'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToMoney = (value: number): string => {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

export const getEmitAndDueDate = (date?: string | Date) => {
  const emitDate = dayjs(date).toDate()
  const parsedEmitDate = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(emitDate)
  const month = new Intl.DateTimeFormat('pt-br', {
    month: 'long',
  }).format(emitDate)
  const dueDate = dayjs().startOf('month').add(14, 'days')
  const parsedDueDate = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(dueDate.toDate())

  return {
    emitDate: parsedEmitDate,
    dueDate: parsedDueDate,
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: emitDate.getFullYear(),
    dueDateOriginal: dueDate.toDate(),
    sqlDueDate: dueDate.format('YYYY-MM-DD'),
    monthYear: dayjs().format('MMYYYY'),
  }
}

export const getMonthYearFromDate = (date: Date) => {
  const emitDate = dayjs(date).toDate()
  const month = new Intl.DateTimeFormat('pt-br', {
    month: 'long',
  }).format(emitDate)

  return {
    month,
    year: emitDate.getFullYear(),
  }
}

export const makeBoletoClientDataList = (
  clientList: ClientWithInvoiceData[],
  month: string,
  sqlDueDate: string,
): NewBoleto[] => {
  return clientList.map((client) => {
    const monthYear = dayjs().format('MMYYYY')
    const reference = `${client.idNumber}${monthYear}`.padStart(8, '0')
    const total_amount = client.plansOnClient.reduce(
      (acc, item) => acc + item.plan.price * item.quantity,
      0,
    )

    const plano = client.plansOnClient[0].plan.name
    return {
      dataVencimento: sqlDueDate,
      valorNominal: total_amount / 100,
      numDiasAgenda: 15,
      seuNumero: reference,
      messagem: {
        linha1: `${plano} - ${month}`,
      },
      pagador: {
        cep: client.address?.zipcode ?? '',
        cidade: client.address?.city ?? '',
        cpfCnpj: client.document ?? '',
        endereco: client.address?.street ?? '',
        nome: client.name,
        tipoPessoa: client.document?.length === 11 ? 'FISICA' : 'JURIDICA',
        uf: client.address?.uf ?? '',
        bairro: client.address?.neighborhood ?? undefined,
        email: client.user.email ?? '',
      },
    }
  })
}
