import { Injectable } from '@angular/core';

import * as moment from 'moment';
@Injectable()
export class DataService {
chatwidth = '350px';exbool = true;chatbool = false;
	toggle_chat(){
		this.chatbool = !this.chatbool;
	}
   expand(){

  	if(this.chatwidth == '350px'){
  		this.exbool = false;
  		this.chatwidth = '800px';
  	}
  	else if(this.chatwidth == '800px'){
  		this.exbool = true;
  		this.chatwidth = '350px';
  	}
  }

	editorbool= false;
	now;displaynow;
  constructor() { }
  initthis(){
  	setInterval(()=> {
      this.now = moment();
      this.displaynow = this.now.format("ddd, MMM Do YY, H:mm:ss");
      },1000);
  }
}
