import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetCoursesService {
  private items: Observable<any[]>;

  private countEqf3: number;
  private countEqf4: number;
  private countEqf5: number;
  private countEqf6: number;
  private countEqf7: number;
  private countEqf8: number;

  eqfCounts: { [key: string]: number } = {}
  collection;

  constructor(db: AngularFirestore) {
    this.collection = db.collection('Courses');
    this.items = this.collection.valueChanges();
    //this.countEqf();

    console.log(this.eqfCounts);
  }

  getCourses() {
    return this.items;
  }

  countEqf(){
    console.log("hola");
    const snapItem : Observable<any[]> = this.collection.snapshotChanges();
    snapItem.pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          console.log(data);
          const eqf = data.educationLevel;
          if (this.eqfCounts[eqf]) {
            this.eqfCounts[eqf]++;
            console.log("hola");}
          else { this.eqfCounts[eqf] = 1; }
        })));
  }
}
