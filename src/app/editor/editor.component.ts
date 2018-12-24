import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
declare var require: any;
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
    private codeEditor: ace.Ace.Editor;
    private editorBeautify;
    public subscriptionEditor: Subscription;
    public subscriptionChat: Subscription;
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
      this.wrap = false;
      this.applyingDeltas = false;
      this.userid = Math.random().toString().slice(2);
      this.stamp = Date.now();
      let path = roomNumber;
      if (path) {
          path = 'rooms/' + path;
      } else {
          path = 'rooms/' + global;
      }
      this.subscriptionEditor = db.object((path) + '/editor/code').valueChanges().take(1).subscribe(editor => {
          this.editor = editor;
          this.applyingDeltas = true;
          this.codeEditor.getSession().getDocument().setValue(editor.toString());
          this.applyingDeltas = false;
      });
      this.subscriptionEditor = db.list((path) + '/editor/queue').valueChanges(['child_added']).subscribe(queue => {
          this.que = queue;
          const element = this.que[this.que.length - 1];
          if (element && element['stamp'] > this.stamp && element['user'] !== this.userid) {
              this.applyDeltas2(element['event']);
          }
      });
      this.subscriptionChat = db.object((path) + '/chat').valueChanges().subscribe(chat => {
          this.chat = chat;
      });
  }
  ngOnDestroy() {
      this.subscriptionEditor.unsubscribe();
      this.subscriptionChat.unsubscribe();
       this.data.editorbool = false;
  }
  ngOnInit() {
      ace.require('ace/ext/language_tools');
      const element = this.codeEditorElmRef.nativeElement;
      const editorOptions = this.getEditorOptions();
      this.codeEditor = ace.edit(element, editorOptions);
      this.codeEditor.setTheme(localStorage.getItem('theme') || THEME);
      this.codeEditor.getSession().setMode(localStorage.getItem('mode') || MODE);
      this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
      this.editorBeautify = ace.require('ace/ext/beautify');
      this.codeEditor.focus();
      this.codeEditor.on('change', (e) => {
              // console.log(e);
              if (!this.applyingDeltas) {return; }
              this.pushEditor(e);
          }
      );
  }
    public pushEditor(e) {
        let currentRoute = roomNumber;
        if (!currentRoute) {
            currentRoute = global;
        }
        this.db.list('rooms').update(currentRoute + '/editor', {code: this.codeEditor.getValue()}).then( s => {/*console.log('code', s) */});
        this.db.list('rooms/' + currentRoute + '/editor/queue').push({stamp: Date.now(), event: e, user: this.userid}).then( s => {/*console.log('queue', s) */});
    }

    public applyDeltas2(delta) {

        this.applyingDeltas = true;
        this.codeEditor.getSession().getDocument().applyDeltas([delta]);
        this.applyingDeltas = false;
    }
    public pushChat() {
        const currentRoute = roomNumber || global;
        this.db.list('rooms').update(currentRoute, {chat: this.chat});
    }
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
    public toggleWrap() {
        this.wrap = (!this.wrap);
        this.codeEditor.getSession().setUseWrapMode(this.wrap);
    }
    public beautifyContent() {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }
    public getCode() {
        const code = this.codeEditor.getValue();
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
