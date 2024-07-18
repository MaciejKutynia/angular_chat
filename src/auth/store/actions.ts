import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {LoginRequestInterface} from "../interfaces/login.interface";


export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<LoginRequestInterface>(),
    'Login Success': props<{ token: string }>,
    'Login Failure': emptyProps(),
  }
})
