import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';

import {AngularFireDatabase} from '@angular/fire/database';
import * as ace from 'ace-builds';
import 'rxjs/operators/take';

import 'brace/index';
import 'brace/theme/monokai';
import 'brace/mode/typescript';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';

// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-github';
// import 'ace-builds/src-noconflict/ext-language_tools';
// import 'ace-builds/src-noconflict/ext-beautify';
import {Subscription} from 'rxjs/Rx';
const themes = ['Chrome', 'Clouds', 'Clouds Midnight', 'Cobalt', 'Crimson Editor', 'Dawn', 'Eclipse', 'Idle Fingers', 'Kr Theme', 'Merbivore', 'Merbivore Soft', 'Mono Industrial', 'Monokai', 'Pastel On Dark', 'Solarized Dark', 'Solarized Light', 'TextMate', 'Tomorrow', 'Tomorrow Night', 'Tomorrow Night Blue', 'Tomorrow Night Bright', 'Tomorrow Night Eighties', 'Twilight', 'Vibrant Ink'];
const modes = ['C_Cpp', 'Clojure', 'Cobol', 'CSharp', 'CSS', 'Dart', 'EJS', 'Elixir', 'golang', 'HTML', 'Java', 'JavaScript', 'JSON', 'LaTeX', 'PHP', 'Python', 'R', 'Ruby', 'Rust', 'SASS', 'Scala', 'SCSS', 'SH', 'snippets', 'SQL', 'Tex', 'Text'];
const THEME = 'ace/theme/monokai';
const MODE = 'ace/mode/javascript';
let roomNumber = '';
const global = '-LUVP3qKecKyTP_nlmh0';

import * as moment from 'moment';
@Injectable()
export class DataService {
  myHeaders = new Headers();options;
	roomid;chats;chatsdisplay;chatlen;
   chatval='';
	public codeEditor: ace.Ace.Editor;
    public setTheme(theme: string) {
      this.codeEditor.setTheme(theme);
      localStorage.setItem('theme', theme);
    }
    public setLanguage(mode: string) {
        this.codeEditor.getSession().setMode(mode);
        localStorage.setItem('mode', mode);
    }
    public setTabSize(tab: number) {
        this.codeEditor.getSession().setTabSize(tab);
        localStorage.setItem('tab', tab.toString());
    }
    public setFontSize(size: string) {
        this.codeEditor.setFontSize(size);
        localStorage.setItem('size', size);
    }

chatwidth = '350px';exbool = true;
chatbool = false;
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
  constructor(public db : AngularFireDatabase, public http : Http){

    localStorage.setItem('chatkey','4e4f15dd2b92477398657c32c2027c87')
    this.myHeaders.append('Content-Type', 'application/json'); 
    this.myHeaders.append('Authorization', 'Bearer 4e4f15dd2b92477398657c32c2027c87'); 
    this.options = new RequestOptions({ headers: this.myHeaders });
    this.chats = db.list('chat');
    this.chatsdisplay = db.list('chat').valueChanges();
    db.list('chat').valueChanges().subscribe(e => {
      this.chatlen = e.length;
    });
    console.log(this.chats)
    /*this.chats.subsrcibe(e => {
    console.log(e)
    })*/
     }
  initthis(){
    localStorage.setItem('chatkey','4e4f15dd2b92477398657c32c2027c87')
    this.roomid = localStorage.getItem('roomid')
  	setInterval(()=> {
      this.now = moment();
      this.displaynow = this.now.format("ddd, MMM Do YY, H:mm:ss");
      },1000);
  }
  sendchat(name, mssg){
    if(mssg != '' && mssg != null){


    var time = moment().format('lll')
    this.chats.push({ name: name, mssg: mssg, time: time });
     this.db.list('chat').valueChanges().subscribe(e => {
      this.chatlen = e.length;
    })
     this.http.post('https://api.dialogflow.com/v1/query?v=20150910',{
       "contexts": [
      "joke"
    ],
    "lang": "en",
    "query": mssg,
    "sessionId": "dasde",
    "timezone": "America/New_York"
     },this.options)
    .subscribe(res =>{
      console.log((<any>res)._body);
      var resp = JSON.parse((<any>res)._body);
      console.log(resp.result);
      console.log(resp.result.fulfillment.speech);
      if (resp.result.fulfillment.speech != '' && resp.result.fulfillment.speech != null && resp.result.fulfillment.speech != undefined) {
        this.chats.push({ name: 'Poo Poo', mssg: resp.result.fulfillment.speech, time: time });
     this.db.list('chat').valueChanges().subscribe(e => {
      this.chatlen = e.length;
    })}});
     this.chatval ='';
   }
  }
}
