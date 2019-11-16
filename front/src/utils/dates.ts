import moment from 'moment'

export const toLocalDate = (date: string) => {
  return moment(date).format('DD.MM.YYYY HH:MM')
}

export const toMappedDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:MI:SS')
}
