import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacerocker',
  templateUrl: './spacerocker.component.html',
  styleUrls: ['./spacerocker.component.scss']
})
export class SpacerockerComponent implements OnInit {
	text = 'https://quickchess.net/';
	text2 = 'Want Mario?';

  constructor() { }
 
  ngOnInit() {
  }
   switch(){
  	if(this.text == 'https://quickchess.net/'){
  		this.text = 'https://supermarioemulator.com/mario.php';
  		this.text2 = 'Back to Chess?';
  	}
  	else if(this.text == 'https://supermarioemulator.com/mario.php'){
  		this.text = 'https://quickchess.net/';
  		this.text2 = 'Want Mario?';
  	}
  }
}
