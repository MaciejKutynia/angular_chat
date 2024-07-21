import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestInterface} from "../interfaces/login.interface";
import {map, EMPTY, catchError, of} from "rxjs";
import {Router} from "@angular/router";
import {AUTH_URL} from "../../utils";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }


  login(data: LoginRequestInterface) {
    const url = `${AUTH_URL}/login`
    return this.http.post(url, data, {responseType: 'text'}).pipe(map(res => ({token: res})))
  }

  verifyToken(token: string) {
    const url = `${AUTH_URL}/verify-token`
    return this.http.post(url, {token}, {responseType: 'text'}).pipe(map(res => res), catchError(err => {
      return of('')
    }))


  }
}
