import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public store: AngularFirestore, public db: AngularFireDatabase) {}

  /**Method to declare the users data*/
  getUserDetails(): Observable<{ id: string }[]> {
    return this.store.collection('users').valueChanges({ idField: 'id' });
  }

  /**Method to add the users data*/
  addUser(): AngularFirestoreCollection {
    return this.store.collection('users');
  }

  /**Method to fetch single user from firebase*/
  getSingleUsers(id: string) {
    return this.db.object('users' + id);
  }
}
