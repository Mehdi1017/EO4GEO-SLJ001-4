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

  numEqf3: number;
  numEqf4: number;
  numEqf5: number;
  numEqf6: number;
  numEqf7: number;
  numEqf8: number;
  
  numEn: number;
  numEs: number;
  numSlo: number;
  numSwe: number;
  
  numSelfLearning: number;
  numTeaching: number;
  numTraining: number;
  numWebinars: number;

  view = [500, 50];

  constructor(private fcs: FilterCoursesService, private getCourses: GetCoursesService) {}

  // boolean to toggle accordion
  isEQFLevelActive = false;
  isLanguageActive = false;
  isCourseTypeActive = false;

  ngOnInit() {
    this.eqfGraph$ = this.getCourses.countCategory("educationLevel").pipe(map(counts => {
      this.numEqf3 = counts["EQF 3"] + counts["EQF 3-4"];
      this.numEqf4 = counts["EQF 4"] + counts["EQF 3-4"] + counts["EQF 4/5/6"];
      this.numEqf5 = counts["EQF 5"] + counts["EQF 5/6/7/8"] + counts["EQF 5/6/7"] + counts["EQF 4/5/6"];
      this.numEqf6 = counts["EQF 6"] + counts["EQF 5/6/7"] + counts["EQF 5/6/7/8"] + counts["EQF 6-7"] + counts["EQF 6;"] + counts["EQF level:6/7"] + counts["EQF 4/5/6"];
      this.numEqf7 = counts["EQF 7"] + counts["EQF 5/6/7"] + counts["EQF 5/6/7/8"] + counts["EQF 6-7"] + counts["EQF level:6/7"];
      this.numEqf8 = counts["EQF 8"] + counts["EQF 5/6/7/8"];

      return [{
        'name': 'EQF levels',
        'series': [  
      {
        'name': 'Eqf 3',
        'value': this.numEqf3
      },
      {
        'name': 'Eqf 4',
        'value':  this.numEqf4
      },
      {
        'name': 'Eqf 5',
        'value':  this.numEqf5
      },
      {
        'name': 'Eqf 6',
        'value':  this.numEqf6
      },
      {
        'name': 'Eqf 7',
        'value':  this.numEqf7
      },
      {
        'name': 'Eqf 8',
        'value':  this.numEqf8
      }
      ]
    }]})
    );

    this.languageGraph$ = this.getCourses.countCategory("language").pipe(map(counts => {
      this.numEn = counts["EN"];
      this.numEs = counts["ES"];
      this.numSlo = counts["SLO"];
      this.numSwe = counts["SWE"];

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
      this.numSelfLearning = counts["self-learning material"] + counts["learning material"] + counts["training material"];
      this.numTeaching = counts["teaching material"];
      this.numWebinars = counts["webinar"];

      return [{
        'name': 'Course types',
        'series': [  
      {
        'name': 'Self learning materials',
        'value': this.numSelfLearning
      },
      {
        'name': 'Teaching materials',
        'value': counts["teaching material"]
      },
      {
        'name': 'Webinars',
        'value': counts["webinar"]
      }
      ]
    }]})
    );

    //this.typeGraph$.subscribe((elements) => console.log(elements));
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
