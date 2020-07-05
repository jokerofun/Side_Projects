import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rockpaperscissor',
  templateUrl: './rockpaperscissor.component.html',
  styleUrls: ['./rockpaperscissor.component.css']
})
export class RockpaperscissorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scores = [0 , 0];
  weapons = ['rock', 'paper', 'scissors'];

  playerSelected = -1;
  enemySelected = -1;
  loading= false;
  isResultShow = false;

  theResult = 0;

  pick( weapon: number): void{
    if(this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;

    setTimeout( ()=> {
      this.loading = false;
      const randomNum = Math.floor(Math.random() * 3 );
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500 ) + 200);
  }

  reset(): void{
    this.scores = [0 , 0];
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;

    if(playerPick === enemyPick){
      this.theResult = 2;
    }else if((playerPick - enemyPick + 3) % 3 === 1){
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
    }else {
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
    }

  }

}
