import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet, NavigationEnd} from '@angular/router';
import {AuthService} from "../auth/services/auth.service";
import {Store} from "@ngrx/store";
import {selectToken} from "../auth/store/reducers";
import {CommonModule} from "@angular/common";
import {selectChatData} from "./store/reducers";
import {filter} from "rxjs";
import {appActions} from "./store/actions";
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
    this.router.navigate(['auth'])
  }

  handleBackToList() {
    this.store.dispatch(appActions.clearChatData());
    this.router.navigate([''])
  }

  ngOnInit() {
    const token = localStorage.getItem('token') || ''
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const {url, urlAfterRedirects} = event
        if (urlAfterRedirects === '/') {
          this.isRoot = true
        } else {
          this.isRoot = false
        }
        if (!token) {
          this.router.navigate(['auth'])
          return
        }
        if (!token) return;
      });
    if (!token) return;
    this.authService.verifyToken(token).subscribe(res => {
      const {url} = this.router
      if (!res && !url.includes('auth')) {
        this.router.navigate(['auth'])
        localStorage.removeItem('token')
        return;
      }
      if (url === '/' || url === '/auth') {
        this.router.navigate(['']);
      }
    })
  }
}
