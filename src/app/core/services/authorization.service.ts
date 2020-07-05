import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  // private _isAdmin = false;

  // isAdminChanged = new Subject<boolean>();

  constructor(private db: AngularFirestore) { }

  // createDoc(username: string) {
  //   this.db.collection('users').doc(username).set({isAdmin: false});
  // }

  // checkIsAdmin(username: string) {
  //   return this.db.collection('users').doc(username).valueChanges();
  // }

  // get isAdmin() {
  //   return this._isAdmin;
  // }

  // initializeIsAdmin(username: string) {
  //   this.checkIsAdmin(username).subscribe((data: any)=>{
  //     if(data && data.isAdmin === true){
  //       this._isAdmin = true;
  //       this.isAdminChanged.next(true);
  //     }else {
  //       this._isAdmin = false;
  //       this.isAdminChanged.next(false);
  //     }
  //   })
  // }

}
