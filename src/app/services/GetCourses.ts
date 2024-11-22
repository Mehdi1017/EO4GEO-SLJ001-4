import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesService {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('Courses').valueChanges();
  }

  getCourses() {
    return this.items;
  }

}
