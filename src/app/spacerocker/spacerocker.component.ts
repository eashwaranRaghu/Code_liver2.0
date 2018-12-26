import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacerocker',
  templateUrl: './spacerocker.component.html',
  styleUrls: ['./spacerocker.component.scss']
})
export class SpacerockerComponent implements OnInit {
	text = 'https://quickchess.net/';
  swi:number = 0;
	text2 = 'Want Mario?';

  constructor() { }
 
  ngOnInit() {
  }
   switch(){
     this.swi = this.swi + 1;
    this.swi = this.swi%3;
    if(this.swi == 0){
      this.text='https://quickchess.net/';
      this.text2 = 'Want Mario?';
    }
    else if(this.swi == 1){
      this.text = 'https://supermarioemulator.com/mario.php';
      this.text2 = 'Want Tekken';
    }
    else if(this.swi == 2){
      this.text = '//www.retrogames.cc/embed/40238-tekken-3.html';
      this.text2 = 'back to Chess?';
    }
    console.log(this.swi,this.text,this.text2)
  }
}
