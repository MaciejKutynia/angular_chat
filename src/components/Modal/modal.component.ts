import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  selector: "chat-modal",
  templateUrl: "./modal.component.html",
  imports: [
    NgClass
  ],
  standalone: true
})
export class ModalComponent {
  @Input({required: true}) isVisible: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  closeHandler() {
    this.onClose.emit(false)
  }
}
