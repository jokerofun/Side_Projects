import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private _isAdmin = false;

  isAdminChanged = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    // this.updateOnUser().subscribe();
   }
   
   get isAdmin() {
     return this._isAdmin;
   }

   checkIfAdmin() {
    //  var uid = '';
    //  this.getUser().then((user)=>{uid = user.uid});
    //  this.db.collection('users').doc(uid).get("isAdmin");
   }

   getPresence(uid: string) {
     return this.db.collection('users').doc(uid).valueChanges();
   }

   getUser() {
     return this.afAuth.authState.pipe(first()).toPromise();
   }

   getUsers() {
     return this.db.collection('users')
   }

  //  async setPresence(status: string) {
  //   const user = await this.getUser();
  //   if (user) {
  //     return this.db.collection('users').doc(user.uid).set({ status });
  //   }
  // }

  // updateOnUser() {
  //   const connection = this.db.collection('connected').valueChanges().pipe(
  //     map(connected => connected ? 'online' : 'offline')
  //   );

  //   return this.afAuth.authState.pipe(
  //     switchMap(user =>  user ? connection : of('offline')),
  //     tap(status => this.setPresence(status))
  //   );
  // }
}
