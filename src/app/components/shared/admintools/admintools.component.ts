import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admintools',
  templateUrl: './admintools.component.html',
  styleUrls: ['./admintools.component.css']
})
export class AdmintoolsComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  makeAdmin(username: string) {
    this.db.collection('users').doc(username).update({isAdmin: true});
  }

  removeAdmin(username: string) {
    this.db.collection('users').doc(username).update({isAdmin: false});
  }

}
