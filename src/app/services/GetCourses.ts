import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesService {
  private items: Observable<any[]>;

  eqfCounts: { [key: string]: number } = {}
  
  snapItems:  Observable<any[]>;

  constructor(db: AngularFirestore) {
    const collection = db.collection('Courses');
    this.items = collection.valueChanges();
    this.snapItems = collection.snapshotChanges();
    this.countEqf();
    console.log(this.eqfCounts);
  }

  getCourses() {
    return this.items;
  }

  getEqfCounts(){
    return this.countEqf;
  }

  countEqf(){  
    this.snapItems.pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const eqf = data.educationLevel;
          if (this.eqfCounts[eqf]) {
            this.eqfCounts[eqf]++;
          }
          else { 
            this.eqfCounts[eqf] = 1; 
          }
        }))
      ).subscribe();
  }
}
