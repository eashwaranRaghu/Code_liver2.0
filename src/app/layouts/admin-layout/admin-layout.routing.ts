import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import { EditorComponent } from '../../editor/editor.component';
import { RoomsComponent } from '../../rooms/rooms.component';
import { VideoChatComponent } from '../../video-chat/video-chat.component';
import { SpacerockerComponent } from '../../spacerocker/spacerocker.component';
import { FileSharingComponent } from '../../file-sharing/file-sharing.component';
import { AboutComponent } from '../../about/about.component';
import { HelpComponent } from '../../help/help.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'editor',      component: EditorComponent },
    { path: 'editor/:id',      component: EditorComponent },
    { path: 'rooms',   component: RoomsComponent },
    { path: 'video-chat',     component: VideoChatComponent },
    { path: 'spacerocker',     component: SpacerockerComponent },
    { path: 'filesharing',          component: FileSharingComponent },
    { path: 'about',           component: AboutComponent },
    { path: 'help',  component: HelpComponent },

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
];
