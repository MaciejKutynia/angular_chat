import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestInterface} from "../interfaces/login.interface";
import {map, EMPTY, catchError, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: LoginRequestInterface) {
    const url = 'http://217.182.75.24:8000/auth/login'
    return this.http.post(url, data, {responseType: 'text'}).pipe(map(res => ({token: res})))
  }

  verifyToken(token: string) {
    const url = 'http://217.182.75.24:8000/auth/verify-token'
    return this.http.post(url, {token}, {responseType: 'text'}).pipe(map(res => res), catchError(err => {
      return of('')
    }))


  }
}
