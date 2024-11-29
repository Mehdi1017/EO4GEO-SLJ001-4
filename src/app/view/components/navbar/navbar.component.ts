import { Component, OnInit } from "@angular/core";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private fcs: FilterCoursesService) {}

  ngOnInit() {}

  onEqfChange(isChecked: boolean, eqfLevel: string) {
    if (isChecked) {
      this.fcs.setEqf(eqfLevel);
      console.log(isChecked, eqfLevel);
    }
  }

  onLanguageChange(isChecked: boolean, language: string) {
    if (isChecked) {
      this.fcs.setLanguage(language);
      console.log(isChecked, language);
    }
  }

  filterCourseType(isChecked: boolean, courseType: string) {
    if (isChecked) {
      this.fcs.setCourseType(courseType);
      console.log(isChecked, courseType);
    }
  }
}
