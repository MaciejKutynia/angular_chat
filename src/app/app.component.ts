import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from "../auth/services/auth.service";
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
  }


  ngOnInit() {
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
