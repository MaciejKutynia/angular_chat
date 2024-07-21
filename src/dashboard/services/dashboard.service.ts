import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ChatItem} from "../interfaces/chat.interface";
import {CHATS_URL, headers} from "../../utils";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }


  getChats(): Observable<ChatItem[]> {
    const token = localStorage.getItem('token')
    return this.http.get<ChatItem[]>(CHATS_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(map(res => res))
  }

  createNewChat(name: string): Observable<ChatItem> {
    return this.http.post<ChatItem>(CHATS_URL, {name}, {
      headers
    }).pipe(map(res => res))
  }
}
