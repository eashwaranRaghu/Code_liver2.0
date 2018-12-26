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
  rooms=[1,2,3,4,5,6];
  constructor() { }
 
  ngOnInit() {
  }
   switch(val){
    if(val == '0'){
      this.text='//www.retrogames.cc/embed/16843-super-mario-bros-japan-usa.html';
    }
    else if(val == '1'){
      this.text='//www.retrogames.cc/embed/16841-contra-usa.html';
    }
    else if(val == '2'){
      this.text='//www.retrogames.cc/embed/25567-battlecity-japan.html';
    }
    else if(val == '3'){
      this.text='//www.retrogames.cc/embed/20411-bomberman-usa.html';
    }
    else if(val == '4'){
      this.text='//www.retrogames.cc/embed/22234-double-dragon-ii-the-revenge-usa.html';
    }
    else if(val == '5'){
      this.text='//www.retrogames.cc/embed/21936-spider-man-return-of-the-sinister-six-europe.html';
    }
    else if(val == '6'){
      this.text='//www.retrogames.cc/embed/27014-road-rash-usa.html';
    }
    else if(val == '7'){
      this.text='//www.retrogames.cc/embed/20844-lode-runner-usa.html';
    }
  }
}

/*
<iframe src="//www.retrogames.cc/embed/20844-lode-runner-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/16843-super-mario-bros-japan-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/16841-contra-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/25567-battlecity-japan.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/20411-bomberman-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/21201-double-dragon-europe.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/21936-spider-man-return-of-the-sinister-six-europe.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
<iframe src="//www.retrogames.cc/embed/27014-road-rash-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>

https://www.retrogames.cc/nes-games/spider-man-return-of-the-sinister-six-europe.html
https://www.retrogames.cc/nes-games/super-mario-bros-japan-usa.html
https://www.retrogames.cc/nes-games/battle-city-japan.html
https://www.retrogames.cc/nes-games/double-dragon-europe.html
https://www.retrogames.cc/nes-games/bomberman-usa.html
https://www.retrogames.cc/nes-games/contra-usa.html
https://www.retrogames.cc/gameboycolor-games/road-rash-usa.html*/