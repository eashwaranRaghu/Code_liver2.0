import { Injectable } from '@angular/core';

import * as moment from 'moment';
@Injectable()
export class DataService {
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
