import dayjs from 'dayjs'

export function parseDate(date: string) {
  return dayjs(date).format('MMMM D, YYYY')
}
