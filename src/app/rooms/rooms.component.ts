import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';

import {DataService} from '../data.service'
let roomIDs = [];
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
rooms = [];
  constructor(public db: AngularFireDatabase, public router: Router, public data: DataService) {

   this.data.roomid = localStorage.getItem('roomid')
      db.object('rooms').valueChanges().take(1).subscribe( s => {
              roomIDs = Object.keys(s);
              roomIDs.forEach(id => {
                  if (this.rooms.length < 100) {
                      this.rooms.push({roomid: id, value: s[id]});
                  }
              });
              console.log(this.rooms);
          }
      );
  }
  redir(id,numb){
    console.log(id);
    localStorage.setItem('room',id);localStorage.setItem('roomid',numb);
    this.data.roomid = localStorage.getItem('roomid')
    this.router.navigate(['../editor'])

  }

  ngOnInit() {
  }

}
/*

for (let i =1; i<=100; i++){
    let ob = {};
    ob = {
        roomNumber: i,
        editor: {code: 'Welcome to Room ' + i},
        chat: 'b'
    };
    db.list('rooms').push(ob);
}*/
