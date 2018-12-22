import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Editor',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Rooms',  icon:'business_bank', class: '' },
    { path: '/maps', title: 'Video Chat',  icon:'tech_tv', class: '' },
    { path: '/notifications', title: 'SpaceRocker',  icon:'media-1_button-play', class: '' },

    { path: '/user-profile', title: 'File Sharing',  icon:'files_single-copy-04', class: '' },
    { path: '/table-list', title: 'About',  icon:'travel_info', class: '' },
    { path: '/typography', title: 'Help',  icon:'text_caps-small', class: '' }
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
