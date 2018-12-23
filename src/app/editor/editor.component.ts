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
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {QueElement} from '../que-element';
const themes = ['Chrome', 'Clouds', 'Clouds Midnight', 'Cobalt', 'Crimson Editor', 'Dawn', 'Eclipse', 'Idle Fingers', 'Kr Theme', 'Merbivore', 'Merbivore Soft', 'Mono Industrial', 'Monokai', 'Pastel On Dark', 'Solarized Dark', 'Solarized Light', 'TextMate', 'Tomorrow', 'Tomorrow Night', 'Tomorrow Night Blue', 'Tomorrow Night Bright', 'Tomorrow Night Eighties', 'Twilight', 'Vibrant Ink'];
const modes = ['C_Cpp', 'Clojure', 'Cobol', 'CSharp', 'CSS', 'Dart', 'EJS', 'Elixir', 'golang', 'HTML', 'Java', 'JavaScript', 'JSON', 'LaTeX', 'PHP', 'Python', 'R', 'Ruby', 'Rust', 'SASS', 'Scala', 'SCSS', 'SH', 'snippets', 'SQL', 'Tex', 'Text'];
const THEME = 'ace/theme/monokai';
const MODE = 'ace/mode/javascript';
let roomNumber = '';


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

  constructor(public db: AngularFireDatabase) {
      // this.db.object('.info').valueChanges().subscribe(s => {console.log('users', s); });
      roomNumber = localStorage.getItem('room');
      this.wrap = false;
      this.applyingDeltas = false;
      this.userid = Math.random().toString().slice(2);
      let path = roomNumber;
      if (path) {
          path = 'rooms/' + path;
      } else {
          path = 'rooms/-LUS89ZHUPyuOuycs0ql'
      }
      this.subscriptionEditor = db.object((path) + '/editor/code').valueChanges().take(1).subscribe(editor => {
          this.editor = editor;
          this.codeEditor.getSession().getDocument().setValue(editor.toString());
      });
      this.subscriptionEditor = db.list((path) + '/editor/queue').valueChanges().subscribe(queue => {
          this.que = queue;
          const element = this.que[this.que.length - 1];
          console.log(element);
          if (element['user'] !== this.userid) {
              this.applyingDeltas = true;
              this.applyDeltas(element['event']);
              this.applyingDeltas = false;
          }
      });
      this.subscriptionChat = db.object((path) + '/chat').valueChanges().subscribe(chat => {
          this.chat = chat;
      });
  }
  ngOnDestroy() {
      this.subscriptionEditor.unsubscribe();
      this.subscriptionChat.unsubscribe();
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
<<<<<<< HEAD
      
=======
      this.codeEditor.on('change', (e) => {
          console.log(e);
          if (this.applyingDeltas) {return; }
          this.pushEditor(e);
          }
      );
>>>>>>> 6d22408644895be16126c5e3aac20f51ece77e06
  }

    public pushEditor(e) {
        let currentRoute = roomNumber;
        if (!currentRoute) {
            currentRoute = '-LUS89ZHUPyuOuycs0ql';
        }
        this.db.list('rooms').update(currentRoute + '/editor/code', {editor: this.codeEditor.getValue()});
        this.db.list('rooms/' + currentRoute + '/editor/queue').push({stamp: Date.now(), event: e, user: this.userid}).then( s => {console.log(s) });
    }
    public applyDeltas(delta) {
        this.codeEditor.getSession().getDocument().applyDelta(delta);
    }
    public pushChat() {
        const currentRoute = roomNumber || '-LUS89ZHUPyuOuycs0ql';
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
