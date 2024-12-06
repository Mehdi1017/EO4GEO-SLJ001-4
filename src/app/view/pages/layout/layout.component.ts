import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as bok from "@eo4geo/find-in-bok-dataviz";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ModalOptions } from "ngx-bootstrap";
import { environment } from "src/environments/environment";
import { timeout } from "d3";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { GetCoursesService } from "src/app/services/GetCourses";
import { map } from "rxjs/operators";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  items: Observable<any[]>;
  filteredCourses$: Observable<any[]>;

  // get the data once during app initialization
  constructor(
    private getCoursesService: GetCoursesService,
    private fcs: FilterCoursesService
  ) {
    this.items = getCoursesService.getCourses();
  }

  ngOnInit() {
    // Subscribe to filter changes from the course-filter service; if anything in course choice changes, it is invoked!
    this.fcs.choice$.subscribe(() => {
      this.filterCourses(); // Call the filter function whenever filters change
    });

    // Initialize filteredCourses$ to show all courses initially
    this.filteredCourses$ = this.items;
  }

  // this method checks if the user choice bok id is present in the course or not; if present returns true to render that course
  isBoKIdExists(course: any, choice: any) {
    for (const relation of course["relation"]) {
      if (relation.includes(`eo4geo:${choice.courseBoK}`)) {
        return true;
      }
    }
    return false;
  }

  isOptionInList(courseCategory: string, choiceList: string[]){
    console.log(`option: ${courseCategory}`);
    for(const choice of choiceList){
      console.log(`choice: ${choice}`);
      if (courseCategory.includes(choice)){
        console.log("true");
        return true;
      }
    }
    return false;
  }

  // this functions filters our course cards based on different choices; All are provided a default value
  filterCourses() {
    let choice = this.fcs.getChoices();
    this.filteredCourses$ = this.items.pipe(
      map((courses) =>
        courses.filter((course) => {
          // Apply the filters
          //console.log(choice.eqfLevel);

          return (
            (choice.eqfLevel.includes("all") ||
              this.isOptionInList(course.educationLevel, choice.eqfLevel)) &&
            (choice.language.includes("all") ||
              choice.language.includes(course.language)) &&
            (choice.courseType.includes("all") ||
              choice.courseType.includes(course.type)) &&
            (choice.courseBoK === "GIST" || this.isBoKIdExists(course, choice))
          );
        })
      )
    );
  }
}
