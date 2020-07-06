import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from 'src/app/components/shared/models/message.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private deleteMessageSub = new Subscription();

  constructor(private afDb: AngularFirestore) { }

  fetchMessages() {
    return this.afDb.collection('messages', ref => ref.orderBy('createdOn', 'desc')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...(data as object) };
      });
    }));
  }

  deleteExcessiveMessages() {
    var lastMessage = null;
    this.deleteMessageSub = this.fetchMessages().subscribe((data)=>{
      if(data.length > 15){
        lastMessage = data.pop();
        this.afDb.collection('messages').doc(lastMessage.id).delete();
        this.deleteMessageSub.unsubscribe();
      }else this.deleteMessageSub.unsubscribe();
    })
  }

  deleteSpecificMessage(messageId: number) {
    var specificMessage = null;
    this.deleteMessageSub = this.fetchMessages().subscribe((data)=>{
        specificMessage = data.splice(messageId, 1);
        this.afDb.collection('messages').doc(specificMessage[0].id).delete();
        this.deleteMessageSub.unsubscribe();
    })
  }

  addMessage(payload: Message) {
    this.afDb.collection<Message>('messages').add(payload)
      .then(() => {
        this.fetchMessages();
      })
        .catch((err)=>{
          console.log(err);
        });
  }
}
