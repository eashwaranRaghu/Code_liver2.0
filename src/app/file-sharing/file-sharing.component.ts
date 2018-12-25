import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Rx';
import {finalize} from 'rxjs/operators';

import {DataService} from '../data.service';
import * as moment from 'moment';
@Component({
    selector: 'app-file-sharing',
    templateUrl: './file-sharing.component.html',
    styleUrls: ['./file-sharing.component.scss']
})
export class FileSharingComponent implements OnInit {
    filesarr;files;
   dropArea;drop_txt="Drop Files Here";back="transparent";




   done='';
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    constructor(private storage: AngularFireStorage, public data: DataService) {
        this.files = data.db.list('files');
        this.filesarr = data.db.list('files').valueChanges(); //|async
        this.filesarr.subscribe(a => console.log(a));
         /*this.dropArea.addEventListener('dragover', handlerFunction, false)
          this.dropArea.addEventListener('drop', handlerFunction, false) */
      }eurl;uploading='';
    uploadFile(event) {
        const file = event.target.files[0];
      
        console.log(event);
        const size = parseInt(file.size)/1000000; //store
        if(size>15){this.done='15MB maximum!!!'}
           else {
        this.uploading = 'upload started'
        this.done='';
        console.log(file.name);                //store
        const filePath = `test/${new Date().getTime()}_${file.name}`;
        console.log(filePath);
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => {this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(e => {this.eurl = e;console.log(e)
                    this.files.push({ name: file.name, size: size, url: e });});
                console.log(this.downloadURL);this.done='done';
                    this.uploading = ''    //store
              
            })
        ).subscribe()}

    }
     uploadFile3(event){
        const file = event.item(0); //just change to this

        console.log(event);
        const size = parseInt(file.size)/1000000; //store
        if(size>15){this.done='15MB maximum!!!'}
           else {
        this.uploading = 'upload started'
        this.done='';
        console.log(file.name);                //store
        const filePath = `test/${new Date().getTime()}_${file.name}`;
        console.log(filePath);
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => {this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(e => {this.eurl = e;console.log(e)
                    this.files.push({ name: file.name, size: size, url: e });});
                console.log(this.downloadURL);this.done='done';
                    this.uploading = ''    //store
              
            })
        ).subscribe()}
    }
    ngOnInit() {
         this.dropArea = document.getElementById('drop-area');
         ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
              this.dropArea.addEventListener(eventName, this.preventDefaults, false)
            })
         this.dropArea.addEventListener('dragleave', (e)=> {console.log(e); this.toggle_style();}, false)
         this.dropArea.addEventListener('dragenter', (e)=> {console.log(e); this.toggle_style();}, false)
         
         this.dropArea.addEventListener('drop',  (e)=> {this.toggle_style();}, false)
    }
  preventDefaults(e){
  e.preventDefault()
  e.stopPropagation()
   }bol=true;
   toggle_style(){
       if(this.drop_txt=="Drop Files Here"){
           this.bol = false;
          this.back = "#9d3f91";
          this.drop_txt="Here comes The Most Awaited File";
       }
       else if(this.drop_txt=="Here comes The Most Awaited File"){
           this.bol = true;
          this.back="transparent"
          this.drop_txt="Drop Files Here";
       }

   }
   handleFiles(files) {
      //([...files]).forEach(this.uploadFile2)
}
task;percentage;snapshot;
  // State for dropzone CSS toggling
  isHovering: boolean;
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}

// https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
// https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/