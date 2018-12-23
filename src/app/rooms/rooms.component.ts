import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import 'rxjs/add/operator/take';
let rooms = [];
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(db: AngularFireDatabase) {
      db.object('rooms').valueChanges().take(1).subscribe( s => {
          /*console.log(s);
          for (let k in s) {
              console.log(k);
          }*/
          }
      );
      /*for(let i =1; i<=100; i++){
          let ob = {};
          ob = {
              roomNumber: i,
              editor: 'a',
              chat: 'b'
          };
          db.list('rooms').push(ob);
      }*/
  }

  ngOnInit() {
  }

}
