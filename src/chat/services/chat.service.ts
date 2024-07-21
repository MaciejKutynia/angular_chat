import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {ChatItem} from "../../dashboard/interfaces/chat.interface";
import {HttpClient} from "@angular/common/http";
import {
  MessageItemInterface,
  NewMessageInterface,
  NewUserInterface,
  UserItemInterface
} from "../interfaces/chat.interface";
import {CHATS_URL, MESSAGES_URL, USERS_URL, headers} from "../../utils";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  getMessages(url_key: string): Observable<MessageItemInterface[]> {
    const url = `${MESSAGES_URL}/${url_key}`
    return this.http.get<MessageItemInterface[]>(url, {
      headers
    }).pipe(map(res => res))
  }

  getUsers(url_key: string): Observable<UserItemInterface[]> {
    const url = `${USERS_URL}/${url_key}`
    return this.http.get<UserItemInterface[]>(url, {
      headers
    }).pipe(map(res => res))
  }

  getChatData({url_key}: { url_key: string }): Observable<ChatItem> {
    const url = `${CHATS_URL}/${url_key}`
    return this.http.get<ChatItem>(url, {headers}).pipe(map(res => res))
  }

  createNewUser(newUserData: NewUserInterface): Observable<UserItemInterface> {
    return this.http.post<UserItemInterface>(USERS_URL, newUserData, {
      headers
    }).pipe(map(res => res))
  }

  createNewMessage(newMessage: NewMessageInterface): Observable<MessageItemInterface> {
    return this.http.post<MessageItemInterface>(MESSAGES_URL, newMessage, {
      headers
    }).pipe(map(res => res))
  }


}
