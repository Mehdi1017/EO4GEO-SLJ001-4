import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterCoursesService {
  // default values
  private choice = {
    eqfLevel: ["all"],
    language: ["all"],
    courseType: ["all"],
    courseBoK: "GIST",
  };

  // Create a BehaviorSubject to track the changes in choice object
  private choiceSubject = new BehaviorSubject(this.choice);
  public choice$ = this.choiceSubject.asObservable(); // Observable to expose the current state

  constructor() {}

  getChoices() {
    return this.choice;
  }

  removeItem(value: string, key: string) {
    let itemIndex = this.choice[key].indexOf(value);
    this.choice[key].splice(itemIndex, 1);
  }

  setEqf(eqfLevel: string) {
    if (this.choice.eqfLevel.includes(eqfLevel)) {
      this.removeItem(eqfLevel, "eqfLevel");
    } else {
      this.choice.eqfLevel.push(eqfLevel);
    }

    this.choiceSubject.next(this.choice); // Emit the updated state
  }

  setLanguage(language: string) {
    if (this.choice.language.includes(language)) {
      this.removeItem(language, "language");
    } else {
      this.choice.language.push(language);
    }

    this.choiceSubject.next(this.choice); // Emit the updated state
  }

  setCourseBoK(courseBoK: string) {
    this.choice.courseBoK = courseBoK;
    this.choiceSubject.next(this.choice); // Emit the updated state
  }

  setCourseType(courseType: string) {
    if (this.choice.courseType.includes(courseType)) {
      this.removeItem(courseType, "courseType");
    } else {
      this.choice.courseType.push(courseType);
    }

    this.choiceSubject.next(this.choice); // Emit the updated state
  }
}
