import {Component} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authActions} from "../../store/actions";
import {selectIsSubmitting} from "../../store/reducers";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthMessageInterface} from "../../interfaces/credentials.interface";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './credentials.component.html'
})

export class CredentialsComponent {
  private _authMessage: AuthMessageInterface = {
    isError: false,
    message: ''
  }

  userForm: FormGroup
  registerForm: FormGroup
  isSubmitting$ = this.store.select(selectIsSubmitting)
  isRegister: boolean = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.min(6), Validators.required]]
    })
  }

  set authMessage(value: AuthMessageInterface) {
    this._authMessage = value
    setTimeout(() => {
      this._authMessage = {
        message: '',
        isError: false
      }
    }, 3000)
  }

  get authMessage(): AuthMessageInterface {
    return this._authMessage;
  }

  showMessage(message: string, isError: boolean) {
    this.authMessage = {
      isError,
      message
    };
  }

  toggleForms() {
    this.isRegister = !this.isRegister
  }

  async submit() {
    this.store.dispatch(authActions.login(this.userForm.value))
    this.authService.login(this.userForm.value).subscribe(res => {
      if (res.body) {
        localStorage.setItem('token', res.body)
        this.router.navigate([''])
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.showMessage('Coś poszło nie tak, spróbuj ponownie za chwilę', true)
        return;
      }
      const error = err.error ? JSON.parse(err.error) : null;
      this.showMessage(error.message, true)

    })
  }

  async register() {
    this.authService.register(this.registerForm.value).subscribe(res => {
      this.isRegister = false;
      this.showMessage('Konto zostało założone, proszę potwierdzić konto poprzez link wysłany na maila', false)
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.showMessage('Coś poszło nie tak, spróbuj ponownie za chwilę', true)
        return;
      }
      const error = err.error ? JSON.parse(err.error) : null;
      this.showMessage(error.message, true)
    })
  }
}
