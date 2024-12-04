import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesService {
  private items: Observable<any[]>;
  
  snapItems:  Observable<any[]>;

  constructor(db: AngularFirestore) {
    const collection = db.collection('Courses');
    this.items = collection.valueChanges();
    this.snapItems = collection.snapshotChanges();
  }

  getCourses() {
    return this.items;
  }

  countEqf(): Observable<{ [key: string]: number}> {  
    return this.snapItems.pipe(
      map(actions =>  {
          const eqfCounts: { [key: string]: number } = {};
          actions.forEach(a => {
          const data = a.payload.doc.data() as any;
          const eqf = data.educationLevel;
          if (eqfCounts[eqf]) {
            eqfCounts[eqf]++;
          }
          else { 
            eqfCounts[eqf] = 1; 
          }
        });
        return eqfCounts;
      })
    );
  }
}
