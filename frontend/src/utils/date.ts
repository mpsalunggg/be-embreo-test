import dayjs from 'dayjs'

export const formatDates = (dates: string) => {
  return dayjs(dates).format('YYYY-MM-DD')
}

export const formatDatesRequest = (dates: string) => {
  return dayjs(dates).toISOString()
}
