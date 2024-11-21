import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-course-wrapper",
  templateUrl: "./course-wrapper.component.html",
  styleUrls: ["./course-wrapper.component.scss"],
})
export class CourseWrapperComponent implements OnInit {
  @Input() courseJSON: [];
  constructor() {}

  ngOnInit() {}
}
