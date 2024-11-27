import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterCoursesService {
  // default values
  private choice = {
  eqfLevel : "all",
  language : "all",
  courseType : "all",
  courseBoK : 'GIST'
  }


  constructor() {}

  getChoices(){
    return this.choice;
  }

  setEqf(eqfLevel: string) {
    this.choice.eqfLevel = eqfLevel;
  }

  setLanguage(language: string) {
    this.choice.language = language;
  }

  setCourseBoK(courseBoK: string) {
    this.choice.courseBoK = courseBoK;
  }

  setCourseType(courseType: string) {
    this.choice.courseType = courseType;
  }
}
