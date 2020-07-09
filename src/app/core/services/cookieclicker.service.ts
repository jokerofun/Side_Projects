import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CookieclickerService {
  username = '';

  constructor(private db: AngularFirestore) { }

  saveProgress(payload) {
    this.username = localStorage.getItem('username');
    this.db.collection('users').doc(this.username).update({'cc': payload});
  }

  loadProgress() {
    this.username = localStorage.getItem('username');
    return this.db.collection('users').doc(this.username).valueChanges();
  }
}
