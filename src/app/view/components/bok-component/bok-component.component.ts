import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import * as bok from "@eo4geo/find-in-bok-dataviz";
import { FilterCoursesService } from "src/app/services/filter-courses.service";

@Component({
  selector: "app-bok-component",
  templateUrl: "./bok-component.component.html",
  styleUrls: ["./bok-component.component.scss"],
})
export class BokComponentComponent implements OnInit {
  private rendered;

  constructor(private fcs: FilterCoursesService) {
    // will render the graphical view and the textual view from the current version in database
    bok.visualizeBOKData(this.inputObject);

    this.rendered = false;
  }

  inputObject = {
    svgId: "#bubbles", // The ID of the SVG element where the visualization will be rendered
    textId: "#textInfo", // The ID of the text element where information will be displayed
    urls: ["https://eo4geo-uji.firebaseio.com/"], // An array of URLs containing the data to be visualized
    conceptId: "GIST", // The ID of the concept to visualize (optional)
    versions: false, // A boolean indicating whether to include versions in the visualization (optional)
    updateUrl: true, // A boolean indicating if url should be updated with the concept id (optional)
  };

  onClick(): void {
    this.fcs.setCourseBoK(window.location.pathname.slice(1));

    console.log(window.location.pathname.slice(1));
  }

  ngOnInit() {}

  // addEventListener on all of the nodes because doesnt work if added on parent
  ngAfterContentChecked() {
    if (!this.rendered) {
      let elements = document.getElementsByClassName("node");
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          elements.item(i).addEventListener("click", this.onClick.bind(this)); //Binding component to plain JS function for service injection
        }
        this.rendered = true;
      }
    }
  }
}
