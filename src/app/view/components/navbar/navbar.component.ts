import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Output() filterChoice: EventEmitter<{
    eqfLevel: string;
    language: string;
    courseType: string;
  }> = new EventEmitter();

  // default values
  eqfLevel = "all";
  language = "all";
  courseType = "all";

  emitFilterChoice() {
    const data = {
      eqfLevel: this.eqfLevel,
      language: this.language,
      courseType: this.courseType,
    };

    this.filterChoice.emit(data);
  }

  constructor() {}

  ngOnInit() {}

  onEqfChange(eqfLevel: string) {
    this.eqfLevel = eqfLevel;
    this.emitFilterChoice();
  }

  onLanguageChange(language: string) {
    this.language = language;
    this.emitFilterChoice();
  }

  filterCourseType(courseType: string) {
    this.courseType = courseType;
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
