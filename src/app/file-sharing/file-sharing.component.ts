import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Rx';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-file-sharing',
    templateUrl: './file-sharing.component.html',
    styleUrls: ['./file-sharing.component.scss']
})
export class FileSharingComponent implements OnInit {
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    constructor(private storage: AngularFireStorage) { }
    uploadFile(event) {
        const file = event.target.files[0];
        const filePath = 'name-your-file-path-here';
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => this.downloadURL = fileRef.getDownloadURL() )
        )
            .subscribe()
    }
    ngOnInit() {
    }

}

// https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
// https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/