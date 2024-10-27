import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthMessageInterface} from "../../interfaces/credentials.interface";

@Component({
  selector: 'app-activate',
  standalone: true,
  templateUrl: './activate.component.html',
  imports: [CommonModule]
})
export class ActivateComponent implements AfterViewInit, OnInit {
  private _authMessage: AuthMessageInterface = {
    isError: false,
    message: ''
  }

  timer = 60;
  chars: number = 6;
  charsArray: number[] = []
  codeArray: string[] = ['', '', '', '', '', ''];
  isSubmitting: boolean = false
  isCodeSendingDisabled: boolean = false;
  token = ''
  @ViewChildren('input') inputs!: QueryList<ElementRef>;


  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.charsArray = Array.from({length: this.chars}, (_, i) => i);
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

  resetCodeArray() {
    this.codeArray = ['', '', '', '', '', '']
  }

  ngAfterViewInit() {
    const firstInput = this.inputs.first;
    if (firstInput) {
      firstInput.nativeElement.focus();
    }
  }

  focusAnotherInput(index: number, direction: 'prev' | 'next') {
    const inputsArray = this.inputs.toArray();
    if (direction === 'next' && index + 1 < this.chars) {
      inputsArray[index + 1].nativeElement.focus();
      return;
    }
    if (direction === 'prev' && index > 0) {
      inputsArray[index - 1].nativeElement.focus();
      return;
    }
  }

  onInputChange(e: Event, index: number) {
    this.disableIsSubmitting();
    const {value} = e.target as HTMLInputElement
    this.codeArray[index] = value
    if (value) {
      this.focusAnotherInput(index, 'next');
    }
  }

  onKeyDown(e: KeyboardEvent, index: number) {
    switch (true) {
      case e.code === 'ArrowRight' && index + 1 < this.chars:
        this.focusAnotherInput(index, 'next')
        break;
      case e.code === 'Backspace':
      case e.code === 'ArrowLeft' && index > 0:
        this.focusAnotherInput(index, 'prev')
        break;
    }
  }

  disableIsSubmitting() {
    this.isSubmitting = false;
  }

  onPaste(e: ClipboardEvent, index: number) {
    e.preventDefault();
    const value = e.clipboardData?.getData('text') || '';
    const codeArray = value.split('');
    for (let i = index; i <= codeArray.length; i++) {
      this.codeArray[i] = codeArray[i] || ''
    }
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault()
    this.isSubmitting = true;
    const value: string = this.codeArray.reduce((acc, char) => acc + char.toUpperCase(), '')
    this.authService.activateAccount(this.token, value).subscribe(res => {
      this.showMessage('Konto zostało aktywowane, możesz się zalogować', false)
      setTimeout(() => {
        this.router.navigate(['auth'])
      }, 3500)

    }, (err) => {
      if (err.status === 500) {
        this.showMessage('Coś poszło nie tak, spróbuj ponownie za chwilę', true)
        return;
      }
      const error = err.error || null;
      this.showMessage(error.message, true)
    })
    this.resetCodeArray();
    this.disableIsSubmitting();
  }

  sendCodeAgain() {
    let interval: ReturnType<typeof setInterval>
    interval = setInterval(() => {
      this.timer = this.timer - 1;
      if (!this.timer) {
        clearInterval(interval)
        this.isCodeSendingDisabled = false;
        this.timer = 60;
      }
    }, 1000)
    this.authService.sendActivationCode(this.token).subscribe(res => {
    }, (err) => {
      if (err.status === 500) {
        this.showMessage('Coś poszło nie tak, spróbuj ponownie za chwilę', true)
        return;
      }
      const error = err.error || null;
      this.showMessage(error.message, true)
    })
    this.isCodeSendingDisabled = true

  }

  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${`0${remainingSeconds}`.slice(-2)}`;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({token}) => {
      this.token = token
    })
  }

}
