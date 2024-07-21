import {createFeature, createReducer, on} from "@ngrx/store";
import {AuthStateInterface} from "../interfaces/authState.interface";
import {authActions} from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  token: localStorage.getItem('token') || ''
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.login, (state) => ({...state, isSubmitting: true})),
    on(authActions.loginFailure, (state) => ({...state, isSubmitting: false})),
    on(authActions.loginSuccess, (state, action) => ({...state, isSubmitting: false, token: action.token})),
    on(authActions.logout, state => ({...state, token: ''}))
  )
})

export const {name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectToken} = authFeature
