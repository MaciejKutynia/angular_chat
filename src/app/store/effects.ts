import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ChatService} from "../../chat/services/chat.service";
import {appActions} from "./actions";
import {map, switchMap} from "rxjs";

export const ChatDataEffect = createEffect((actions$ = inject(Actions), appService = inject(ChatService)) => actions$.pipe(
  ofType(appActions.getChatData),
  switchMap((req) => appService.getChatData(req).pipe(map((chatData) => appActions.getChatDataSuccess(chatData))))
), {functional: true})
