import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {authActions} from "./actions";
import {catchError, map, of, switchMap} from "rxjs";

export const LoginEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => actions$.pipe(
    ofType(authActions.login),
    switchMap((req) => authService.login(req).pipe(map(({body: token}) => authActions.loginSuccess({token})), catchError(() => of(authActions.loginFailure()))))
  ),
  {functional: true})
