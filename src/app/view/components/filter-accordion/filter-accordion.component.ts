import { Component, OnInit } from "@angular/core";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-filter-accordion",
  templateUrl: "./filter-accordion.component.html",
  styleUrls: ["./filter-accordion.component.scss"],
})
export class FilterAccordionComponent implements OnInit {
  constructor(private fcs: FilterCoursesService) {}

  // boolean to toggle accordion
  isEQFLevelActive = false;
  isLanguageActive = false;
  isCourseTypeActive = false;

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

  toggleFitler(accordion: string) {
    this[accordion] = !this[accordion];
  }
}
