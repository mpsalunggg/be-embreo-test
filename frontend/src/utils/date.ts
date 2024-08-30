import dayjs from 'dayjs'

export const formatProposedDates = (
  dates: string[],
  confirmDate: string | null
) => {
  if (confirmDate) {
    return dayjs(confirmDate).format('YYYY-MM-DD')
  }
  return dates.length > 0 ? dayjs(dates[0]).format('YYYY-MM-DD') : 'N/A'
}
