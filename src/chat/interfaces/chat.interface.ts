export interface NewUserInterface {
  url_key: string
  name: string
}

export interface UserItemInterface {
  name: string
  url_key: string
  account_id: number
  id: number
}

export interface NewMessageInterface {
  content: string
  user_id: number
}

export interface MessageItemInterface {
  id: number
  url_key: string
  content: string
  user_id: number
  date: string
  account_id: number
  user_index: number
  user_name?: string
}
