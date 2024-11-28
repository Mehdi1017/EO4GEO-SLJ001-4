import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Output() filterChoice: EventEmitter<any> = new EventEmitter();

  emitFilterChoice() {

    this.filterChoice.emit();
  }

  constructor(private fcs: FilterCoursesService) {}

  ngOnInit() {}

  onEqfChange(eqfLevel: string) {
    this.fcs.setEqf(eqfLevel);
    this.emitFilterChoice();
  }

  onLanguageChange(language: string) {
    this.fcs.setLanguage(language);
    this.emitFilterChoice();
  }

  filterCourseType(courseType: string) {
    this.fcs.setCourseType(courseType);
    this.emitFilterChoice();
  }

  addClass(event: Event) {
    // Remove 'active' class from all links
    const links = document.querySelectorAll(".link");
    links.forEach((link) => link.classList.remove("active"));

    // Add 'active' class to the clicked link
    const clickedLink = event.target as HTMLElement;
    clickedLink.classList.add("active");
  }
}
