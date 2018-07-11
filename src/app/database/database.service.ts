import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {

  constructor(private afs: AngularFirestore) {

  }

  public getCollection(collectionName, a: string = '1', b: any = '==', c: string = '1', callback) {    //name == 'eric'
    this.afs.collection(collectionName, ref => ref.where(a, b, c)).valueChanges().subscribe(result => {
      if (callback) {
        callback(result);
      }
    });
  }

  public addDocument(collectionName, document, callback) {
    let that = this;
    this.afs.collection(collectionName).add(document).then(function(docRef) {
      document.id = docRef.id;
      that.afs.collection(collectionName).doc(docRef.id).set(document);
      if (callback) {
        callback();
      }
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  public updateDocument(collectionName, document, callback) {
    let that = this;
	that.afs.collection(collectionName).doc(document.id).set(document).then(function(){
		if (callback) {
          callback();
        }
	}).catch(function(error){
		console.error("Error adding document: ", error);
	});
  }
}
