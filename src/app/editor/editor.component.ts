import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
declare var require: any;
import * as ace from 'ace-builds';
import 'rxjs/operators/take';
import 'brace/index';
import 'brace/theme/monokai';
import 'brace/theme/chrome';import 'brace/theme/clouds';import 'brace/theme/crimson_editor';
import 'brace/theme/dawn';import 'brace/theme/dreamweaver';import 'brace/theme/eclipse';import 'brace/theme/github';
import 'brace/theme/iplastic';import 'brace/theme/solarized_light';import 'brace/theme/textmate';import 'brace/theme/tomorrow';
import 'brace/theme/xcode';import 'brace/theme/kuroir';import 'brace/theme/katzenmilch';import 'brace/theme/sqlserver';
import 'brace/theme/ambiance';import 'brace/theme/chaos';import 'brace/theme/clouds_midnight';
import 'brace/theme/cobalt';import 'brace/theme/gruvbox';import 'brace/theme/idle_fingers';import 'brace/theme/kr_theme';
import 'brace/theme/merbivore';import 'brace/theme/terminal';import 'brace/theme/twilight';import 'brace/theme/vibrant_ink';

import 'brace/mode/c_cpp';import 'brace/mode/clojure';import 'brace/mode/cobol';import 'brace/mode/csharp';
import 'brace/mode/css';import 'brace/mode/dart';import 'brace/mode/ejs';import 'brace/mode/elixir';
import 'brace/mode/golang';import 'brace/mode/html';import 'brace/mode/java';import 'brace/mode/javascript';
import 'brace/mode/json';import 'brace/mode/latex';import 'brace/mode/php';import 'brace/mode/python';
import 'brace/mode/ruby';import 'brace/mode/rust';import 'brace/mode/scss';import 'brace/mode/scala';
import 'brace/mode/sass';import 'brace/mode/sh';import 'brace/mode/snippets';import 'brace/mode/sql';
import 'brace/mode/tex';import 'brace/mode/text';
import 'brace/ext/language_tools.js';

       


// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-github';
// import 'ace-builds/src-noconflict/ext-language_tools';
// import 'ace-builds/src-noconflict/ext-beautify';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subscription} from 'rxjs/Rx';
const themes = ['monokai', 'ambiance', 'chaos', 'clouds_midnight', 'cobalt', 'gruvbox', 'idle_fingers', 'kr_theme', 'merbivore', 'terminal','twilight', 'chrome', 'clouds', 'crimson_editor', 'dawn', 'dreamweaver', 'eclipse', 'github', 'iplastic', 'solarized_light', 'textmate', 'tomorrow', 'xcode', 'kuroir', 'katzenmilch', 'sqlserver'];
const modes = ['c_cpp', 'clojure', 'cobol', 'csharp', 'css', 'dart', 'ejs', 'elixir', 'golang', 'html', 'java', 'javascript', 'json', 'latex', 'php', 'python', 'r', 'ruby', 'rust', 'scss', 'scala', 'sass', 'sh', 'snippets', 'sql', 'tex', 'text'];
const THEME = 'ace/theme/chaos';
const MODE = 'ace/mode/html';
let roomNumber = '';
const global = '-LUVP3qKecKyTP_nlmh0';

import {DataService} from '../data.service'
/*const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';
*/
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
    @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    
    private editorBeautify;
    public subscriptionCode: Subscription;
    public subscriptionQueue: Subscription;
    public editor: {};
    public que: {}[];
    public chat: {};
    public wrap: boolean;
    public applyingDeltas: boolean;
    public userid: string;
    public stamp: number;

  constructor(public db: AngularFireDatabase, public data: DataService) {
    this.data.editorbool = true;
      roomNumber = localStorage.getItem('room');
      this.wrap = true;
      this.applyingDeltas = false;
      this.userid = Math.random().toString().slice(2);
      this.stamp = Date.now();
      let path = roomNumber;
      if (path) {
          path = 'rooms/' + path;
      } else {
          path = 'rooms/' + global;
      }
      this.subscriptionCode = db.object((path) + '/editor/code').valueChanges().take(1).subscribe(editor => {
          this.editor = editor;
          this.applyingDeltas = true;
          this.data.codeEditor.getSession().getDocument().setValue(editor.toString());
          this.applyingDeltas = false;
      });
      this.subscriptionQueue = db.list((path) + '/editor/queue').stateChanges(['child_added']).subscribe(queue => {
          const element = queue.payload.toJSON();
          const keys = Object.keys(element['event']['lines']);
          let lines = [];
          keys.forEach( k => {
              lines.push(element['event']['lines'][k])
          });
          element['event']['lines'] = lines;
          if (element && element['stamp'] > this.stamp && element['user'].toString() !== this.userid) {
              this.applyDeltas2(element['event']);
          }
      });
  }
  ngOnDestroy() {
      this.subscriptionQueue.unsubscribe();
      // this.subscriptionCode.unsubscribe();
       this.data.editorbool = false;
  }
  ngOnInit() {
      ace.require('ace/ext/language_tools');
      const element = this.codeEditorElmRef.nativeElement;
      const editorOptions = this.getEditorOptions();
      this.data.codeEditor = ace.edit(element, editorOptions);
      this.data.codeEditor.setTheme(localStorage.getItem('theme') || THEME);
      this.data.codeEditor.getSession().setMode(localStorage.getItem('mode') || MODE);
      this.data.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
      this.editorBeautify = ace.require('ace/ext/beautify');
      this.data.codeEditor.focus();
      this.data.codeEditor.on('change', (e) => {
              // console.log(e);
              if (this.applyingDeltas) {return; }
              this.pushEditor(e);
          }
      );
  }

    public pushEditor(e) {
        let currentRoute = roomNumber;
        if (!currentRoute) {
            currentRoute = global;
        }
        this.db.list('rooms').update(currentRoute + '/editor', {code: this.data.codeEditor.getValue()}).then( s => {/*console.log('code', s) */});
        this.db.list('rooms/' + currentRoute + '/editor/queue').push({stamp: Date.now(), event: e, user: this.userid}).then( s => {/*console.log('queue', s) */});
    }
    public applyDeltas2(delta) {
        this.applyingDeltas = true;
        this.data.codeEditor.getSession().getDocument().applyDelta(delta);
        this.applyingDeltas = false;
    }
    public pushChat() {
        const currentRoute = roomNumber || global;
        this.db.list('rooms').update(currentRoute, {chat: this.chat});
    }
     public setTheme(theme: string) {
      this.data.codeEditor.setTheme(theme);
      localStorage.setItem('theme', theme);
    }
    public setLanguage(mode: string) {
        this.data.codeEditor.getSession().setMode(mode);
        localStorage.setItem('mode', mode);
    }
    public setTabSize(tab: number) {
        this.data.codeEditor.getSession().setTabSize(tab);
        localStorage.setItem('tab', tab.toString());
    }
    public setFontSize(size: string) {
        this.data.codeEditor.setFontSize(size);
        localStorage.setItem('size', size);
    }
    public toggleWrap() {
        this.wrap = (!this.wrap);
        this.data.codeEditor.getSession().setUseWrapMode(this.wrap);
    }
    public beautifyContent() {
        if (this.data.codeEditor && this.editorBeautify) {
            const session = this.data.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }
    public getCode() {
        const code = this.data.codeEditor.getValue();
        console.log(code);
    }
    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
        const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 14,
            maxLines: Infinity,
        };
        const extraEditorOptions = {
            enableBasicAutocompletion: true
        };
        const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
        return margedOptions;
    }
}
//   https://github.com/ajaxorg/ace-builds
//   https://medium.com/@ofir3322/create-an-online-ide-with-angular-6-nodejs-part-1-163a939a7929
