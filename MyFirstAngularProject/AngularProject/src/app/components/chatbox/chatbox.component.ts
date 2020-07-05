import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: Observable<any[]>;

  messageForm: FormGroup;

  isAdmin: boolean = false;
  isAdminSub: Subscription;

  constructor(private messageService: MessageService, private fb: FormBuilder, private authService: AuthService) {

   }

  ngOnInit() {
    this.isAdminSub = this.authService.isAdminChanged.subscribe((data) => {
      this.isAdmin = data;
    })

    this.messageForm = this.fb.group({
      text: [null]
    });

    this.messages = this.messageService.fetchMessages();
    this.messageService.deleteExcessiveMessages();
    }

    sendMessage() {
      const text = this.messageForm.value.text;
      var author = localStorage.getItem('email');
      if(author === null){
        author = 'Anonymous';
      }else {
        author = author.substring(0, author.lastIndexOf("@"));
      }

      if(text === null){
        return;
      }else{
        this.messageService.addMessage({author, createdOn: new Date(), text});
      }

      this.messageService.deleteExcessiveMessages();
      this.messageForm.reset();
    }

    deleteMessage(e) {
      let messageId = Number(e.target.id);
      this.messageService.deleteSpecificMessage(messageId);
    }
  }
