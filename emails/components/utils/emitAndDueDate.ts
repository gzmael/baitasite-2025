import dayjs from 'dayjs'

export const getEmitAndDueDate = (dueDays: number) => {
  const emitDate = dayjs().toDate()
  const parsedEmitDate = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(emitDate)
  const month = new Intl.DateTimeFormat('pt-br', {
    month: 'long',
  }).format(emitDate)
  const dueDate = dayjs().startOf('month').add(dueDays, 'days').toDate()
  const parsedDueDate = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'long',
    timeZone: 'America/Fortaleza',
  }).format(dueDate)

  return {
    emitDate: parsedEmitDate,
    dueDate: parsedDueDate,
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: emitDate.getFullYear(),
  }
}
