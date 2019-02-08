import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';

import {DataService} from '../data.service'
import {LiveService} from '../live.service';
let roomIDs = [];
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
rooms = [];
room2 = [
  {
    "roomid": "-LUVP3qKecKyTP_nlmh0",
    "roomNumber": 1
  },
  {
    "roomid": "-LUVP3qLYmTZWb_gb6wn",
    "roomNumber": 2
  },
  {
    "roomid": "-LUVP3qMRwy5WG4KDC3k",
    "roomNumber": 3
  },
  {
    "roomid": "-LUVP3qMRwy5WG4KDC3l",
    "roomNumber": 4
  },
  {
    "roomid": "-LUVP3qMRwy5WG4KDC3m",
    "roomNumber": 5
  },
  {
    "roomid": "-LUVP3qNrIXLNhNe0VKE",
    "roomNumber": 6
  },
  {
    "roomid": "-LUVP3qOEJEM2S53JzdL",
    "roomNumber": 7
  },
  {
    "roomid": "-LUVP3qOEJEM2S53JzdM",
    "roomNumber": 8
  },
  {
    "roomid": "-LUVP3qQAnfSuYK89I0k",
    "roomNumber": 9
  },
  {
    "roomid": "-LUVP3qQAnfSuYK89I0l",
    "roomNumber": 10
  },
  {
    "roomid": "-LUVP3qRyhpvZhEgNcTD",
    "roomNumber": 11
  },
  {
    "roomid": "-LUVP3qS0s88hv3FipVZ",
    "roomNumber": 12
  },
  {
    "roomid": "-LUVP3qTaFDDabDyupKt",
    "roomNumber": 13
  },
  {
    "roomid": "-LUVP3qTaFDDabDyupKu",
    "roomNumber": 14
  },
  {
    "roomid": "-LUVP3qUSaLZvCAQGk6H",
    "roomNumber": 15
  },
  {
    "roomid": "-LUVP3qV5hTz_MnS_4bX",
    "roomNumber": 16
  },
  {
    "roomid": "-LUVP3qWhC2f8H8sOV-l",
    "roomNumber": 17
  },
  {
    "roomid": "-LUVP3qWhC2f8H8sOV-m",
    "roomNumber": 18
  },
  {
    "roomid": "-LUVP3qXn6WgRbhixjP_",
    "roomNumber": 19
  },
  {
    "roomid": "-LUVP3qXn6WgRbhixjPa",
    "roomNumber": 20
  },
  {
    "roomid": "-LUVP3qXn6WgRbhixjPb",
    "roomNumber": 21
  },
  {
    "roomid": "-LUVP3qYRMoIz3O-mYIO",
    "roomNumber": 22
  },
  {
    "roomid": "-LUVP3qYRMoIz3O-mYIP",
    "roomNumber": 23
  },
  {
    "roomid": "-LUVP3qZaG6QElDTSGWn",
    "roomNumber": 24
  },
  {
    "roomid": "-LUVP3qZaG6QElDTSGWo",
    "roomNumber": 25
  },
  {
    "roomid": "-LUVP3qZaG6QElDTSGWp",
    "roomNumber": 26
  },
  {
    "roomid": "-LUVP3q_E8qC9ABNzib1",
    "roomNumber": 27
  },
  {
    "roomid": "-LUVP3qaykz5Pf9MNV5G",
    "roomNumber": 28
  },
  {
    "roomid": "-LUVP3qaykz5Pf9MNV5H",
    "roomNumber": 29
  },
  {
    "roomid": "-LUVP3qbxKXBPG5mVaR8",
    "roomNumber": 30
  },
  {
    "roomid": "-LUVP3qc_JRxi1nR8uT0",
    "roomNumber": 31
  },
  {
    "roomid": "-LUVP3qduT8MdwH1NSgS",
    "roomNumber": 32
  },
  {
    "roomid": "-LUVP3qeLRpJ_g03VOef",
    "roomNumber": 33
  },
  {
    "roomid": "-LUVP3qfCpueMvYnmtGV",
    "roomNumber": 34
  },
  {
    "roomid": "-LUVP3qfCpueMvYnmtGW",
    "roomNumber": 35
  },
  {
    "roomid": "-LUVP3qfCpueMvYnmtGX",
    "roomNumber": 36
  },
  {
    "roomid": "-LUVP3qgI3reOArFlbAk",
    "roomNumber": 37
  },
  {
    "roomid": "-LUVP3qgI3reOArFlbAl",
    "roomNumber": 38
  },
  {
    "roomid": "-LUVP3qj0hBh502PZqSl",
    "roomNumber": 39
  },
  {
    "roomid": "-LUVP3qkrL8TKz-T42eG",
    "roomNumber": 40
  },
  {
    "roomid": "-LUVP3qkrL8TKz-T42eH",
    "roomNumber": 41
  },
  {
    "roomid": "-LUVP3qlgiPardtzvtp4",
    "roomNumber": 42
  },
  {
    "roomid": "-LUVP3qlgiPardtzvtp5",
    "roomNumber": 43
  },
  {
    "roomid": "-LUVP3qm7fKLt5LiiYFQ",
    "roomNumber": 44
  },
  {
    "roomid": "-LUVP3qm7fKLt5LiiYFR",
    "roomNumber": 45
  },
  {
    "roomid": "-LUVP3qnNm4eMp0I43_e",
    "roomNumber": 46
  },
  {
    "roomid": "-LUVP3qnNm4eMp0I43_f",
    "roomNumber": 47
  },
  {
    "roomid": "-LUVP3qoimKmY_yBzI2E",
    "roomNumber": 48
  },
  {
    "roomid": "-LUVP3qp5UDm0eemZZ54",
    "roomNumber": 49
  },
  {
    "roomid": "-LUVP3qqLwCjSkdMmdd0",
    "roomNumber": 50
  },
  {
    "roomid": "-LUVP3qqLwCjSkdMmdd1",
    "roomNumber": 51
  },
  {
    "roomid": "-LUVP3qqLwCjSkdMmdd2",
    "roomNumber": 52
  },
  {
    "roomid": "-LUVP3qrKGktf3pu5sB-",
    "roomNumber": 53
  },
  {
    "roomid": "-LUVP3qrKGktf3pu5sB0",
    "roomNumber": 54
  },
  {
    "roomid": "-LUVP3qshmYl4RLEuHwH",
    "roomNumber": 55
  },
  {
    "roomid": "-LUVP3qshmYl4RLEuHwI",
    "roomNumber": 56
  },
  {
    "roomid": "-LUVP3quuCPnnTwVdL92",
    "roomNumber": 57
  },
  {
    "roomid": "-LUVP3quuCPnnTwVdL93",
    "roomNumber": 58
  },
  {
    "roomid": "-LUVP3qvKUBEaO0S-QEA",
    "roomNumber": 59
  },
  {
    "roomid": "-LUVP3qvKUBEaO0S-QEB",
    "roomNumber": 60
  },
  {
    "roomid": "-LUVP3qwKaJzx1nzCIyi",
    "roomNumber": 61
  },
  {
    "roomid": "-LUVP3qyTdmvTlJnQGa-",
    "roomNumber": 62
  },
  {
    "roomid": "-LUVP3qzaIuyxbAOkm6I",
    "roomNumber": 63
  },
  {
    "roomid": "-LUVP3qzaIuyxbAOkm6J",
    "roomNumber": 64
  },
  {
    "roomid": "-LUVP3r-8oTCZPakBoi_",
    "roomNumber": 65
  },
  {
    "roomid": "-LUVP3r-8oTCZPakBoia",
    "roomNumber": 66
  },
  {
    "roomid": "-LUVP3r0RxlHR4u3kYE4",
    "roomNumber": 67
  },
  {
    "roomid": "-LUVP3r2_8pzVGRzmMQL",
    "roomNumber": 68
  },
  {
    "roomid": "-LUVP3r2_8pzVGRzmMQM",
    "roomNumber": 69
  },
  {
    "roomid": "-LUVP3r2_8pzVGRzmMQN",
    "roomNumber": 70
  },
  {
    "roomid": "-LUVP3r3knFn9M2sQ5qO",
    "roomNumber": 71
  },
  {
    "roomid": "-LUVP3r3knFn9M2sQ5qP",
    "roomNumber": 72
  },
  {
    "roomid": "-LUVP3r4zKHql74BKmHy",
    "roomNumber": 73
  },
  {
    "roomid": "-LUVP3r4zKHql74BKmHz",
    "roomNumber": 74
  },
  {
    "roomid": "-LUVP3r5F9FOoJZ1cHcx",
    "roomNumber": 75
  },
  {
    "roomid": "-LUVP3r6IeS0FSO3llZ8",
    "roomNumber": 76
  },
  {
    "roomid": "-LUVP3r6IeS0FSO3llZ9",
    "roomNumber": 77
  },
  {
    "roomid": "-LUVP3r6IeS0FSO3llZA",
    "roomNumber": 78
  },
  {
    "roomid": "-LUVP3r7-amGzruSs1Zv",
    "roomNumber": 79
  },
  {
    "roomid": "-LUVP3r8Y9JzSwmmfdNg",
    "roomNumber": 80
  },
  {
    "roomid": "-LUVP3r8Y9JzSwmmfdNh",
    "roomNumber": 81
  },
  {
    "roomid": "-LUVP3r9YOZnRinbMWv9",
    "roomNumber": 82
  },
  {
    "roomid": "-LUVP3r9YOZnRinbMWvA",
    "roomNumber": 83
  },
  {
    "roomid": "-LUVP3rANVvmxYt8BIYw",
    "roomNumber": 84
  },
  {
    "roomid": "-LUVP3rANVvmxYt8BIYx",
    "roomNumber": 85
  },
  {
    "roomid": "-LUVP3rB0wytp9KCVLYg",
    "roomNumber": 86
  },
  {
    "roomid": "-LUVP3rCmRxhzvLslFpS",
    "roomNumber": 87
  },
  {
    "roomid": "-LUVP3rCmRxhzvLslFpT",
    "roomNumber": 88
  },
  {
    "roomid": "-LUVP3rCmRxhzvLslFpU",
    "roomNumber": 89
  },
  {
    "roomid": "-LUVP3rDF3uE2Il8I4nF",
    "roomNumber": 90
  },
  {
    "roomid": "-LUVP3rDF3uE2Il8I4nG",
    "roomNumber": 91
  },
  {
    "roomid": "-LUVP3rFSUpYvjMHTOzp",
    "roomNumber": 92
  },
  {
    "roomid": "-LUVP3rGAd2-m_ieDpWg",
    "roomNumber": 93
  },
  {
    "roomid": "-LUVP3rGAd2-m_ieDpWh",
    "roomNumber": 94
  },
  {
    "roomid": "-LUVP3rIHtJRRQRRs2ab",
    "roomNumber": 95
  },
  {
    "roomid": "-LUVP3rIHtJRRQRRs2ac",
    "roomNumber": 96
  },
  {
    "roomid": "-LUVP3rJyC_NE0Pfx5r8",
    "roomNumber": 97
  },
  {
    "roomid": "-LUVP3rJyC_NE0Pfx5r9",
    "roomNumber": 98
  },
  {
    "roomid": "-LUVP3rKR1B9BcxQkoDS",
    "roomNumber": 99
  },
  {
    "roomid": "-LUVP3rL_xW1n-8NOWRv",
    "roomNumber": 100
  }
];
  constructor(public db: AngularFireDatabase, public router: Router, public data: DataService, public live: LiveService) {
   /*this.data.roomid = localStorage.getItem('roomid')
      db.object('rooms').valueChanges().take(1).subscribe( s => {
              roomIDs = Object.keys(s);
              roomIDs.forEach(id => {
                  if (this.rooms.length < 100) {
                      this.rooms.push({roomid: id, value: s[id]});
                  }
              });
              console.log(this.rooms);
              for(let a of this.rooms){
                this.room2.push({roomid: a.roomid, roomNumber: a.value.roomNumber})
              }
              console.log(this.room2);
          }
      );*/
  }
  redir(id, numb) {
    console.log(id);
    this.live.leave(localStorage.getItem('roomid'));
    localStorage.setItem('room', id);
    localStorage.setItem('roomid', numb);
    this.live.join(numb || '-LUVP3qKecKyTP_nlmh0');
    this.data.roomid = localStorage.getItem('roomid');
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
