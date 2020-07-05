import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { PresenceService } from './presence.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;
  private _isAdmin = false;

  isAuthChanged = new Subject<boolean>();
  isAdminChanged = new Subject<boolean>();

  username: string = localStorage.getItem('username') || '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar,
    private db: AngularFirestore,
  ) { }

  get isAuth() {
    return this._isAuth;
  }

  // async initializeStates() {
  //   await this.initializeAuthState();
  //   this.initializeIsAdmin();
  //   console.log(username);
  //   console.log(this._isAuth);
  //   console.log(this._isAdmin);
  // }

  initializeAuthState() {
    this.afAuth.authState.subscribe((userState) => {
      if (userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
        this.initializeIsAdmin();
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    })
  }
  
  initializeIsAdmin() {
    if(this._isAuth === true){
      this.checkIsAdmin(this.username).subscribe((data: any)=>{
        if(data && data.isAdmin === true){
          this._isAdmin = true;
          this.isAdminChanged.next(true);
        }else {
          this._isAdmin = false;
          this.isAdminChanged.next(false);
        }
      })
    }
  }

  createDoc(username: string) {
    this.db.collection('users').doc(username).set({isAdmin: false});
  }

  checkIsAdmin(username: string) {
    return this.db.collection('users').doc(username).valueChanges();
  }

  get isAdmin() {
    return this._isAdmin;
  }

  loginUser(email: string, password: string) {
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.router.navigate(['/home']);
        this.username = email.substring(0, email.lastIndexOf("@"));
        localStorage.setItem('email', userData.user.email);
        localStorage.setItem('username', this.username);
        // this.authorizationService.initializeIsAdmin(username);
        this.snackbar.open('Login Successful!', 'X', {
          duration: 3000
        });
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'X', {
          duration: 3000
        });
      });
  }

  registerUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
        this.username = email.substring(0, email.lastIndexOf("@"));
        localStorage.setItem('email', email);
        localStorage.setItem('username', this.username);
        this.createDoc(this.username);
        // this.authorizationService.initializeIsAdmin(username);
        this.snackbar.open('Registration Successful!', 'X', {
          duration: 3000
        });
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'X', {
          duration: 3000
        });
      });
  }

  logout() {
    // this.presence.setPresence('offline');
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.username = '';
    this.router.navigate(['/login']);
  }
}
