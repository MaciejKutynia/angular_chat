import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ChatItem} from "../../dashboard/interfaces/chat.interface";

export const appActions = createActionGroup({
  source: 'app',
  events: {
    GetChatData: props<{ url_key: string }>(),
    'GetChatData Success': props<ChatItem>(),
    ClearChatData: emptyProps()
  }
})
