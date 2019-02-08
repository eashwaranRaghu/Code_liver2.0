import { Component} from '@angular/core';
import {DataService} from './data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public data: DataService) {
    	this.data.initthis();
    localStorage.removeItem('firebase:previous_websocket_failure');

    }
}
