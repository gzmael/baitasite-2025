import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
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