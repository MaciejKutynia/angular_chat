import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestInterface} from "../interfaces/login.interface";
import {map, EMPTY, catchError, of} from "rxjs";
import {Router} from "@angular/router";
import {AUTH_URL} from "../../utils";
import {RegisterRequestInterface} from "../interfaces/register.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: LoginRequestInterface) {
    const url = `${AUTH_URL}/login`
    return this.http.post(url, data, {observe: 'response', responseType: 'text'})
  }

  verifyToken(token: string) {
    const url = `${AUTH_URL}/verify-token`
    return this.http.post(url, {token}, {responseType: 'text'}).pipe(map(res => res), catchError(err => {
      return of('')
    }))
  }

  register(data: RegisterRequestInterface) {
    const url = `${AUTH_URL}/register`
    return this.http.post(url, data, {observe: 'response', responseType: 'text'})
  }

  activateAccount(token: string, code: string) {
    const url = `${AUTH_URL}/activate-account/${token}`
    return this.http.post(url, {code}, {observe: 'response'})
  }

  sendActivationCode(token: string) {
    const url = `${AUTH_URL}/activate-code/${token}`
    return this.http.get(url, {observe: 'response'})
  }
}
