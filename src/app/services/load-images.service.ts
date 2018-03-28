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
    console.log(images);
  }

}
