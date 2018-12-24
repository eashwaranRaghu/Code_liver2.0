import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/editor', title: 'Editor',  icon: 'design_app', class: '' },
    { path: '/rooms', title: 'Rooms',  icon:'business_bank', class: '' },
    { path: '/video-chat', title: 'Screen Sharing',  icon:'tech_tv', class: '' },
    { path: '/filesharing', title: 'DropZone',  icon:'files_single-copy-04', class: '' },
    { path: '/spacerocker', title: 'Chess Vs AI',  icon:'media-1_button-play', class: '' },
    { path: '/about', title: 'About',  icon:'travel_info', class: '' },
    { path: '/help', title: 'Help',  icon:'education_agenda-bookmark', class: '' },

    { path: '/dashboard', title: 'Editor1',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Rooms1',  icon:'business_bank', class: '' },
    { path: '/maps', title: 'Video Chat1',  icon:'tech_tv', class: '' },
    { path: '/notifications', title: 'SpaceRocker1',  icon:'media-1_button-play', class: '' },
    { path: '/user-profile', title: 'File Sharing1',  icon:'files_single-copy-04', class: '' },
    { path: '/table-list', title: 'About1',  icon:'travel_info', class: '' },
    { path: '/typography', title: 'Help1',  icon:'text_caps-small', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
