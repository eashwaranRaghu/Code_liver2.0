import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import {DataService} from './data.service'
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {LiveService} from './live.service';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
@NgModule({
  imports: [
    BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireStorageModule,
      AngularFireDatabaseModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
      SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [DataService, LiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
