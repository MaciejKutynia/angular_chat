import { Component } from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authActions} from "./store/actions";
import {selectIsSubmitting} from "./store/reducers";
import {CommonModule} from "@angular/common";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  userForm: FormGroup
  isSubmitting$ = this.store.select(selectIsSubmitting)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      password: ['',[Validators.required, Validators.email]]
    })
  }

  async submit() {
    this.store.dispatch(authActions.login(this.userForm.value))
    this.authService.login(this.userForm.value).subscribe(res => {
      localStorage.setItem('token', res.token)
      this.router.navigate([''])
    })
  }
}
