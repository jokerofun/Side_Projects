import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  username = '';

  constructor(private db: AngularFirestore) { }

  store(payload){
    this.username = localStorage.getItem('username');
    this.db.collection('users').doc(this.username).update({'snake': payload})
  }

  retrieve(){
    this.username = localStorage.getItem('username');
    return this.db.collection('users').doc(this.username).valueChanges();
  }

  // retrieve(): number{
  //   let res = 0;
  //   this.db.collection('users').doc(this.username).valueChanges().subscribe((data:any) => {
  //     res = data.snake.best_score;
  //   });
  //   return res;
  // }
}
