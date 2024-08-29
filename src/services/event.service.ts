import { createEvent, getAllEvent } from '../repositories/event.repository'
import { ApiError } from '../utils/error.util'

export const createEventService = async (
  event_name: string,
  id_author: string
) => {
  if (!event_name || !id_author) {
    throw new ApiError('Event name and id author required!', 400)
  }
  const newEvent = await createEvent({ event_name, id_author })

  return newEvent
}

export const getAllEventService = async () => {
  const allEvent = await getAllEvent()
  if (!allEvent?.length) {
    throw new ApiError('Nothing event', 404)
  }
  return allEvent
}
