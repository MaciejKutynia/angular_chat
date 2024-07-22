import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "../components/Modal/modal.component";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "./services/chat.service";
import {MessageItemInterface, UserItemInterface} from "./interfaces/chat.interface";
import {ChatItem} from "../dashboard/interfaces/chat.interface";
import {Store} from "@ngrx/store";
import {selectChatData} from "../app/store/reducers";
import {appActions} from "../app/store/actions";

@Component({
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  newMessage: FormGroup;
  newUser: FormGroup;

  chatData: ChatItem | null = null;

  users: UserItemInterface[] = [];
  messages: MessageItemInterface[] = [];

  selectedUser: UserItemInterface | null = null

  url_key: string = ''

  modalOpen = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private chatService: ChatService, private router: Router, private store: Store) {
    this.newMessage = this.fb.group({
      content: ['', Validators.required],
    })

    this.newUser = this.fb.group({
      name: ['', Validators.required],
    })
  }

  handleModalVisible(isVisible: boolean) {
    this.modalOpen = isVisible
  }

  handleSelectUser(id: number) {
    this.selectedUser = this.users.find(user => user.id === id) || null
  }


  async submit() {
    if (!this.selectedUser) return;
    this.chatService.createNewMessage({
      ...this.newMessage.value,
      user_id: this.selectedUser?.id,
      url_key: this.url_key
    }).subscribe(res => {
      this.messages.push(res)
    })
    this.newMessage.get('content')?.reset()
  }

  async createUser() {
    this.chatService.createNewUser({...this.newUser.value, url_key: this.url_key}).subscribe(res => {
      this.users.push(res)
    })
    this.handleModalVisible(false)
  }

  async getUsers() {
    this.chatService.getUsers(this.url_key).subscribe(res => {
      this.users = res;
    })
  }

  async getMessages() {
    this.chatService.getMessages(this.url_key).subscribe(async res => {
      if (!this.users.length) {
        await this.getUsers()
      }
      const messages = []
      for (const message of res) {
        const user = this.users.find(user => user.id === message.user_id)
        if (!user) continue;
        messages.push({
          ...message,
          user_index: this.users.findIndex(user => user.id === message.user_id),
          user_name: user?.name
        })
      }
      this.messages = messages;
    })
  }

  async getChat() {
    this.store.dispatch(appActions.getChatData({url_key: this.url_key}))
    this.chatService.getChatData({url_key: this.url_key}).subscribe(res => {
      this.chatData = res;
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.url_key = params.get('id')!
    })
    this.getChat().then(() => {
      this.getUsers().then((res) => {
        this.getMessages()
      })
    })


  }
}
