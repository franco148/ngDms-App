import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';


@Injectable()
export class LoadImagesService {

  private IMAGE_FOLDER = 'img';

  constructor(private db: AngularFirestore) { }

  private saveImage(image: { name: string, url: string }) {
    this.db.collection(`/${this.IMAGE_FOLDER}`)
           .add(image);
  }

  loadFirebaseImages(images: FileItem[]) {
    // console.log(images);
    const storageRef = firebase.storage().ref();

    for (const item of images) {

      item.isUploading = true;
      if (item.progress >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.IMAGE_FOLDER }/${ item.fileName }`)
                                                                .put(item.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error at uploading the file', error),
        () => {
          console.log('Image uploaded successfully');
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;

          this.saveImage({
            name: item.fileName,
            url: item.url
          });
        }
      );
    }
  }

}
