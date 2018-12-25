import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
chatwidth = '350px';exbool = true;chatbool = false;
  constructor() { }
 
  ngOnInit() {
  }
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
}




