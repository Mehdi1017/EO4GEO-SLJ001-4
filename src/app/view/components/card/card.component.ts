import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() course: {};

  constructor() {
  }

  ngOnInit() {

    //console.log(this.course['relation'].includes("eo4geo:" + "IP3-11"));
  }
}
