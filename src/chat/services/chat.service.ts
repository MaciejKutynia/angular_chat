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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token: string | null = localStorage.getItem("token");

  headers = {
    Authorization: `Bearer ${this.token}`
  }

  constructor(private http: HttpClient) {
  }

  getMessages(url_key: string): Observable<MessageItemInterface[]> {
    const url = `http://localhost:8000/message/${url_key}`
    return this.http.get<MessageItemInterface[]>(url, {
      headers: this.headers
    }).pipe(map(res => res))
  }

  getUsers(url_key: string): Observable<UserItemInterface[]> {
    const url = `http://localhost:8000/user/${url_key}`
    return this.http.get<UserItemInterface[]>(url, {
      headers: this.headers
    }).pipe(map(res => res))
  }

  getChatData(url_key: string): Observable<ChatItem> {
    const url = `http://localhost:8000/chats/${url_key}`
    return this.http.get<ChatItem>(url, {headers: this.headers}).pipe(map(res => res))
  }

  createNewUser(newUserData: NewUserInterface): Observable<UserItemInterface> {
    const url = `http://localhost:8000/user`
    return this.http.post<UserItemInterface>(url, newUserData, {
      headers: this.headers
    }).pipe(map(res => res))
  }

  createNewMessage(newMessage: NewMessageInterface): Observable<MessageItemInterface> {
    const url = `http://localhost:8000/message`
    return this.http.post<MessageItemInterface>(url, newMessage, {
      headers: this.headers
    }).pipe(map(res => res))
  }


}
