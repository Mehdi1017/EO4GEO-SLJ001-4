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
  constructor(private getCoursesService: GetCoursesService, private fcs: FilterCoursesService) {
    this.items = getCoursesService.getCourses();
  }

  ngOnInit() {
    // Initialize filteredCourses$ to show all courses initially
    this.filteredCourses$ = this.items;

  }

  filterCourses() {
    let choice = this.fcs.getChoices();
    this.filteredCourses$ = this.items.pipe(
      map((courses) =>
        courses.filter((course) => {
          // Apply the filters
          console.log(choice.courseBoK);
          function isInArray() {
            for (const relation of course['relation']) {
              if (relation.includes(`eo4geo:${choice.courseBoK}`)){
                return true;
              }
            }
            return false;
          }
          return (
            (choice.eqfLevel === "all" ||
              course.educationLevel === choice.eqfLevel) &&
            (choice.language === "all" ||
              course.language === choice.language) &&
            (choice.courseType === "all" || course.type === choice.courseType) &&
              (choice.courseBoK === "GIST" || isInArray())
          );
        })
      )
    );
  }
}
