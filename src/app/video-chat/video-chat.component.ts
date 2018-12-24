import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit {
urlob;url;
  constructor(public db : AngularFireDatabase) {

     
  	 this.urlob = db.object('videochat').valueChanges();
  	 this.urlob.subscribe(url => {
          console.log(this.urlob);
          this.url = url;
      });

   }
   set_link(val){
   	this.db.object('videochat').set(val);

   }
  ngOnInit() {
  }

}
