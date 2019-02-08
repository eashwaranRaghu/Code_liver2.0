import { Component, OnInit, ElementRef , AfterViewInit, ViewChild} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import PerfectScrollbar from 'perfect-scrollbar';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , AfterViewInit{
  @ViewChild("mssg") nameField: ElementRef;
    private listTitles: any[];chat:HTMLElement;
  chatbool = false;

  toggle_chat(){
    this.chatbool = !this.chatbool;
    if(this.chatbool == false ){
     
     setTimeout(()=>{

    this.chat = document.getElementById("chat");
         this.chat.scrollTo({
      top: this.chat.scrollHeight,
      left: 0,
      behavior: 'smooth'
      });
     this.stb();
     },100)
}
  }

  themes = ['monokai', 'ambiance', 'chaos', 'clouds_midnight', 'cobalt', 'gruvbox', 'idle_fingers', 'kr_theme', 'merbivore', 'terminal','twilight', 'chrome', 'clouds', 'crimson_editor', 'dawn', 'dreamweaver', 'eclipse', 'github', 'iplastic', 'solarized_light', 'textmate', 'tomorrow', 'xcode', 'kuroir', 'katzenmilch', 'sqlserver'];
  modes = ['c_cpp', 'clojure', 'cobol', 'csharp', 'css', 'dart', 'ejs', 'elixir', 'golang', 'html', 'java', 'javascript', 'json', 'latex', 'php', 'python', 'r', 'ruby', 'rust', 'scss', 'scala', 'sass', 'sh', 'snippets', 'sql', 'tex', 'text'];
   sizes = ['30px','26px','22px','18px','15px','12px','9px',]
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public isCollapsed = true;
    constructor(public data: DataService, location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
      this.sidebarVisible = false;
      data.db.list('chat').valueChanges().subscribe(e => {

      setTimeout(()=>{
      this.chat = document.getElementById("chat");
        this.chat.scrollTo({
          top: this.chat.scrollHeight,
          left: 0,
          behavior: 'smooth'
      });
     },100)
    });
         // this.sidebarOpen();
    }
    ngAfterViewInit(){
       this.sidebarToggle();
       this.chat = document.getElementById("chat");
    }
    stb(){
       this.chat.scrollTo({
      top: this.chat.scrollHeight,
      left: 0,
      behavior: 'smooth'
      });
       console.log("scrolled")
    }
     
    ngOnInit(){
     setTimeout(()=>{
     this.stb();
     },4000)


      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    collapse(){
      this.isCollapsed = !this.isCollapsed;
      const navbar = document.getElementsByTagName('nav')[0];
      console.log(navbar);
      if (!this.isCollapsed) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('bg-white');
      }else{
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('bg-white');
      }

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        const html = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 991) {
          mainPanel.style.position = 'fixed';
        }

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];

        if (window.innerWidth < 991) {
          setTimeout(function(){
            mainPanel.style.position = '';
          }, 500);
        }
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const html = document.getElementsByTagName('html')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const html = document.getElementsByTagName('html')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            html.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (html.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (html.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              html.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            html.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
    sendchat(name, mssg){
      this.nameField.nativeElement.value='';
      this.nameField.nativeElement.focus();
      this.data.sendchat(name,mssg);
   //   msghtml.focus();
    
     }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return '';
    }
}
