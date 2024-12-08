import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() course: {};

  link: string;

  constructor() {
  }

  ngOnInit() {
    this.link = "http://www.eo4geo.eu/training/" + this.course["title"].toLowerCase().replaceAll(" ", "-") + "/";
  }
}
