import { Component, OnInit } from "@angular/core";
import { FilterCoursesService } from "src/app/services/filter-courses.service";
import { GetCoursesService } from "src/app/services/GetCourses";
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: "app-filter-accordion",
  templateUrl: "./filter-accordion.component.html",
  styleUrls: ["./filter-accordion.component.scss"],
})
export class FilterAccordionComponent implements OnInit {

  colorScheme5 = {
    domain: ['#751A1D', '#EE9B00', '#E9D8A6', '#94D2BD', '#002E3D']
  };

  colorScheme10 = {
    domain: ['#751A1D', '#AE2012', '#CA6702', '#EE9B00', '#E9D8A6', '#94D2BD', '#0A9396', '#005F73', '#002E3D', '#002229']
  };

  eqfGraph$: Observable<any[]>;
  languageGraph$: Observable<any[]>;
  typeGraph$: Observable<any[]>;

  view = [500, 50];

  constructor(private fcs: FilterCoursesService, private getCourses: GetCoursesService) {}

  // boolean to toggle accordion
  isEQFLevelActive = false;
  isLanguageActive = false;
  isCourseTypeActive = false;

  ngOnInit() {
    this.eqfGraph$ = this.getCourses.countCategory("educationLevel").pipe(map(counts => {
      return [{
        'name': 'EQF levels',
        'series': [  
      {
        'name': 'Eqf 3',
        'value': counts["EQF 3"] + counts["EQF 3-4"]
      },
      {
        'name': 'Eqf 4',
        'value':  counts["EQF 4"] + counts["EQF 3-4"] + counts["EQF 4 / 6"]
      },
      {
        'name': 'Eqf 5',
        'value':  counts["EQF 5"] + counts["EQF 5 to 8"] + counts["EQF 5/6/7"] + counts["EQF 4 / 6"]
      },
      {
        'name': 'Eqf 6',
        'value':  counts["EQF 6"] + counts["EQF 5/6/7"] + counts["EQF 5 to 8"] + counts["EQF 6-7"] + counts["EQF 6;"] + counts["EQF level:6/7"] + counts["EQF 4 / 6"]
      },
      {
        'name': 'Eqf 7',
        'value':  counts["EQF 7"] + counts["EQF 5/6/7"] + counts["EQF 5 to 8"] + counts["EQF 6-7"] + counts["EQF level:6/7"]
      },
      {
        'name': 'Eqf 8',
        'value':  counts["EQF 8"] + counts["EQF 5 to 8"]
      }
      ]
    }]})
    );

    this.languageGraph$ = this.getCourses.countCategory("language").pipe(map(counts => {
      return [{
        'name': 'Languages',
        'series': [  
      {
        'name': 'English',
        'value': counts["EN"]
      },
      {
        'name': 'Spanish',
        'value': counts["ES"]
      },
      {
        'name': 'Slovenien',
        'value': counts["SLO"]
      },
      {
        'name': 'Swedish',
        'value': counts["SWE"]
      }
      ]
    }]})
    );

    this.typeGraph$ = this.getCourses.countCategory("type").pipe(map(counts => {
      return [{
        'name': 'Course types',
        'series': [  
      {
        'name': 'Learning materials',
        'value': counts["learning material"]
      },
      {
        'name': 'Self learning materials',
        'value': counts["self-learning material"]
      },
      {
        'name': 'Teaching materials',
        'value': counts["teaching material"]
      },
      {
        'name': 'Training materials',
        'value': counts["training material"]
      },
      {
        'name': 'Webinars',
        'value': counts["webinar"]
      }
      ]
    }]})
    );

    this.typeGraph$.subscribe((elements) => console.log(elements));
  }

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
