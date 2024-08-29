import Event, { EventModel } from '../models/event.model'

export const createEvent = async (
  event: Partial<EventModel>
): Promise<EventModel> => {
  return Event.create(event)
}

export const getAllEvent = async (): Promise<EventModel[] | null> => {
  return Event.find()
}