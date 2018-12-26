import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AceEditorModule } from 'ng2-ace-editor';
import { EditorComponent } from '../../editor/editor.component';
import { RoomsComponent } from '../../rooms/rooms.component';
import { VideoChatComponent } from '../../video-chat/video-chat.component';
import { SpacerockerComponent } from '../../spacerocker/spacerocker.component';
import { FileSharingComponent } from '../../file-sharing/file-sharing.component';
import { AboutComponent } from '../../about/about.component';
import { SafePipe } from '../../safe.pipe';
import {DropZoneDirective} from '../../drop-zone.directive';
import {FileSizePipe} from '../../file-size.pipe';
import {StorageBucket} from '@angular/fire/storage';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    AceEditorModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    EditorComponent,
    RoomsComponent,
    VideoChatComponent,
    SpacerockerComponent,
    FileSharingComponent,
    AboutComponent,
    SafePipe,
    DropZoneDirective,
    FileSizePipe
  ],
    providers: [
        { provide: StorageBucket, useValue: 'codeliver-v2' }
    ]
})

export class AdminLayoutModule {}
