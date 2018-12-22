import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EditorComponent } from './editor/editor.component';
import { RoomsComponent } from './rooms/rooms.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { SpacerockerComponent } from './spacerocker/spacerocker.component';
import { FileSharingComponent } from './file-sharing/file-sharing.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EditorComponent,
    RoomsComponent,
    VideoChatComponent,
    SpacerockerComponent,
    FileSharingComponent,
    AboutComponent,
    HelpComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
