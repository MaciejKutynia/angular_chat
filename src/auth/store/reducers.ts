import {createFeature, createReducer, on} from "@ngrx/store";
import {AuthStateInterface} from "../interfaces/authState.interface";
import {authActions} from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  token: ''
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.login, (state: AuthStateInterface) => ({...state, isSubmitting: true})),
    on(authActions.loginFailure, (state) => ({...state, isSubmitting: false})),
    on(authActions.loginSuccess, (state, x) => ({...state, isSubmitting: false})
    )
  )
})

export const {name: authFeatureKey, reducer: authReducer, selectIsSubmitting} = authFeature
