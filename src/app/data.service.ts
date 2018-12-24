import { Injectable } from '@angular/core';

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
import {AngularFireDatabase} from '@angular/fire/database';
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
	roomid;
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
  initthis(){this.roomid = localStorage.getItem('roomid')
  	setInterval(()=> {
      this.now = moment();
      this.displaynow = this.now.format("ddd, MMM Do YY, H:mm:ss");
      },1000);
  }
}
