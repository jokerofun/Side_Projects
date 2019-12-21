import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CookieclickerService {
  username = localStorage.getItem('username');

  constructor(private db: AngularFirestore) { }

  saveProgress(payload) {
    this.db.collection('users').doc(this.username).update({'cc': payload});
  }

  loadProgress() {
    return this.db.collection('users').doc(this.username).valueChanges();
  }
}
