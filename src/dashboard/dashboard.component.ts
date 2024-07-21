import {Component, OnInit} from "@angular/core";
import {DashboardService} from "./services/dashboard.service";
import {Router} from "@angular/router";
import {ChatItem} from "./interfaces/chat.interface";
import {NgForOf} from "@angular/common";
import {ModalComponent} from "../components/Modal/modal.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'chat-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NgForOf,
    ModalComponent,
    ReactiveFormsModule
  ]
})
export class DashboardComponent implements OnInit {

  newChat: FormGroup

  constructor(private dashboardService: DashboardService, private router: Router, private fb: FormBuilder) {
    this.newChat = this.fb.group({
      name: ['', Validators.required]
    })
  }

  chats: ChatItem[] = []
  modalOpen: boolean = false;

  ngOnInit() {
    this.getChats()
  }


  handleModalVisible(isVisible: boolean) {
    this.modalOpen = isVisible
  }

  async getChats() {
    this.dashboardService.getChats().subscribe(res => {
      this.chats = res
    })
  }

  addNewChat() {
    this.modalOpen = true;
  }

  async submit() {
    this.dashboardService.createNewChat(this.newChat.value.name).subscribe(res => {
    })
  }
}
