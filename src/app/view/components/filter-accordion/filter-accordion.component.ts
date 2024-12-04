import { Component, OnInit } from "@angular/core";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-filter-accordion",
  templateUrl: "./filter-accordion.component.html",
  styleUrls: ["./filter-accordion.component.scss"],
})
export class FilterAccordionComponent implements OnInit {

  colorScheme5 = {
    domain: ['#751A1D', '#EE9B00', '#E9D8A6', '#94D2BD', '#002E3D']
  };

  scopeGraph = [
    {
        'name': 'Scope',
        'series': [
          {
            'name': 'Local',
            'value': 70
          },
          {
            'name': 'Regional',
            'value': 55
          }
        ]
      }
    ];

  view = [null, 50];

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
