import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet, NavigationEnd} from '@angular/router';
import {AuthService} from "../auth/services/auth.service";
import {Store} from "@ngrx/store";
import {selectToken} from "../auth/store/reducers";
import {CommonModule} from "@angular/common";
import {selectChatData} from "./store/reducers";
import {filter} from "rxjs";
import {appActions} from "./store/actions";
import {isRoot} from "@angular/compiler-cli";
import {authActions} from "../auth/store/actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  isToken$ = this.store.select(selectToken)
  chatData$ = this.store.select(selectChatData)
  isRoot: boolean = false

  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }

  logout() {
    localStorage.removeItem('token')
    this.store.dispatch(authActions.logout());
    this.router.navigate(['login'])
  }

  handleBackToList() {
    this.store.dispatch(appActions.clearChatData());
    this.router.navigate([''])
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/') {
          this.isRoot = true
        } else {
          this.isRoot = false
        }
      });
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['login'])
      return
    }
    this.authService.verifyToken(token).subscribe(res => {
      if (!res) {
        this.router.navigate(['login'])
        return;
      }
      const currentUrl = this.router.url;
      if (currentUrl === '/' || currentUrl === '/login') {
        this.router.navigate(['']);
      }
    })
  }
}
