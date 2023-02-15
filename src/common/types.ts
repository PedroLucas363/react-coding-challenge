export interface IMessage {
  _id: string,
  user: {
    email: string
  },
  message: string,
  subject: string,
  createdAt: string,
}

export interface IMessagePayload {
  user: {
    email: string
  },
  message: string,
  subject: string,
}
