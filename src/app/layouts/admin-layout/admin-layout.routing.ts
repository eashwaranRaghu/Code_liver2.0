import { Routes } from '@angular/router';

import { EditorComponent } from '../../editor/editor.component';
import { RoomsComponent } from '../../rooms/rooms.component';
import { VideoChatComponent } from '../../video-chat/video-chat.component';
import { SpacerockerComponent } from '../../spacerocker/spacerocker.component';
import { FileSharingComponent } from '../../file-sharing/file-sharing.component';
import { AboutComponent } from '../../about/about.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'editor',      component: EditorComponent },
    { path: 'rooms',   component: RoomsComponent },
    { path: 'video-chat',     component: VideoChatComponent },
    { path: 'spacerocker',     component: SpacerockerComponent },
    { path: 'filesharing',          component: FileSharingComponent },
    { path: 'about',           component: AboutComponent }
];