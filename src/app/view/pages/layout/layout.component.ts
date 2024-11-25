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

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  items: Observable<any[]>;
  filteredCourses$: Observable<any[]>;

  // get the data once during app initialization
  constructor(private getCoursesService: GetCoursesService) {
    this.items = getCoursesService.getCourses();
  }

  ngOnInit() {
    // Initialize filteredCourses$ to show all courses initially
    this.filteredCourses$ = this.items;

  }

  filterCourses(choice: {
    eqfLevel: string;
    language: string;
    courseType: string;
    courseBoK: string;
  }) {
    this.filteredCourses$ = this.items.pipe(
      map((courses) =>
        courses.filter((course) => {
          // Apply the filters
          console.log(choice.courseBoK);
          return (
            (choice.eqfLevel === "all" ||
              course.educationLevel === choice.eqfLevel) &&
            (choice.language === "all" ||
              course.language === choice.language) &&
            (choice.courseType === "all" || course.type === choice.courseType) &&
              (choice.courseBoK === "GIST" || course['relation'].includes(`eo4geo:${choice.courseBoK}`))
          );
        })
      )
    );
  }
}
