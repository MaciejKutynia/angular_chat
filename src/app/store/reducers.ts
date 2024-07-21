import {AppStateInterface} from "../interfaces/app.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {appActions} from "./actions";

const initialState: AppStateInterface = {
  chatData: null
}

const appFeature = createFeature({
  name: 'app',
  reducer: createReducer(
    initialState,
    on(appActions.getChatDataSuccess, (state, action) => ({...state, chatData: action})),
    on(appActions.clearChatData, (state) => ({...state, chatData: null}))
  )
})

export const {name: appFeatureKey, reducer: appReducer, selectChatData} = appFeature
