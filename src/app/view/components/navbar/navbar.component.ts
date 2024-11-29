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

  onEqfChange(eqfLevel: string) {
    this.fcs.setEqf(eqfLevel);
  }

  onLanguageChange(language: string) {
    this.fcs.setLanguage(language);
  }

  filterCourseType(courseType: string) {
    this.fcs.setCourseType(courseType);
  }
}
