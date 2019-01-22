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
    { path: '/spacerocker', title: 'Nintendo',  icon:'media-1_button-play', class: '' },
    { path: '/about', title: 'About',  icon:'travel_info', class: '' },
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
