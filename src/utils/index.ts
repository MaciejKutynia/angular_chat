export const baseApi = 'http://217.182.75.241:5000'

export const CHATS_URL = `${baseApi}/chats`;
export const AUTH_URL = `${baseApi}/auth`;
export const MESSAGES_URL = `${baseApi}/message`;
export const USERS_URL = `${baseApi}/user`;

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`
}
