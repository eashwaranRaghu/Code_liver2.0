import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
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
import { HelpComponent } from '../../help/help.component';
import { SafePipe } from '../../safe.pipe';
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
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    EditorComponent,
    RoomsComponent,
    VideoChatComponent,
    SpacerockerComponent,
    FileSharingComponent,
    AboutComponent,
    HelpComponent,
    SafePipe,
  ]
})

export class AdminLayoutModule {}
