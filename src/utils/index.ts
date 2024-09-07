export const baseApi = 'https://chatapi.mkwsieci.pl'

export const CHATS_URL = `${baseApi}/chats`;
export const AUTH_URL = `${baseApi}/auth`;
export const MESSAGES_URL = `${baseApi}/message`;
export const USERS_URL = `${baseApi}/user`;

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`
}
