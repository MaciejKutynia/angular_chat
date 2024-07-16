import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ChatItem} from "../interfaces/chat.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getChats(): Observable<ChatItem[]> {
    const token = localStorage.getItem("token");
    const url = 'http://localhost:8000/chats'
    return this.http.get<ChatItem[]>(url, {headers: {
      Authorization: `Bearer ${token}`
      }}).pipe(map(res => res))
  }
}
