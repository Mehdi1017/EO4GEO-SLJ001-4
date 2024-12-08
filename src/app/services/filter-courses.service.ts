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

  setOption(option: string, category: string) {
    let choiceList: [string] = this.choice[category];
    if (choiceList.includes("all")){
      this.removeItem("all", category);
      choiceList.push(option);
    }
    else if (choiceList.includes(option)) {
      this.removeItem(option, category);
      if (choiceList.length <= 0){
        choiceList.push("all")
      }       
      } 
    else {
      choiceList.push(option);
    }
    this.choiceSubject.next(this.choice); // Emit the updated state
  }

  setCourseBoK(courseBoK: string) {
    this.choice.courseBoK = courseBoK;
    this.choiceSubject.next(this.choice); // Emit the updated state
  }
}
