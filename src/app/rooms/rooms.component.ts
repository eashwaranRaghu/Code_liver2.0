import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(db: AngularFireDatabase) {
      db.object('rooms').valueChanges().subscribe( s => {
              console.log(s);
          }
      );
  }

  ngOnInit() {
  }

}
