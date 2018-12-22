import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    private codeEditor: ace.Ace.Editor;
    private editorBeautify;

  constructor() {
  }

  ngOnInit() {
      ace.require("ace/ext/language_tools");
      const element = this.codeEditorElmRef.nativeElement;
      const editorOptions = this.getEditorOptions();

      this.codeEditor = ace.edit(element, editorOptions);
      this.codeEditor.setTheme(THEME);
      this.codeEditor.getSession().setMode(LANG);
      this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
      this.editorBeautify = ace.require("ace/ext/beautify");
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

    public beautifyContent() {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }

    private getCode() {
        const code = this.codeEditor.getValue();
        console.log(code);
    }


}
//   https://github.com/ajaxorg/ace-builds
//   https://medium.com/@ofir3322/create-an-online-ide-with-angular-6-nodejs-part-1-163a939a7929