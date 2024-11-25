import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as bok from '@eo4geo/find-in-bok-dataviz';

@Component({
  selector: 'app-bok-component',
  templateUrl: './bok-component.component.html',
  styleUrls: ['./bok-component.component.scss'],
})
export class BokComponentComponent implements OnInit {
  private rendered;

  constructor() {
    // will render the graphical view and the textual view from the current version in database
    bok.visualizeBOKData(this.inputObject);

    this.rendered = false;

  }

  inputObject = {
    svgId: '#bubbles', // The ID of the SVG element where the visualization will be rendered
    textId: '#textInfo', // The ID of the text element where information will be displayed
    urls: ['https://eo4geo-uji.firebaseio.com/'], // An array of URLs containing the data to be visualized
    conceptId: 'GIST', // The ID of the concept to visualize (optional)
    versions: true, // A boolean indicating whether to include versions in the visualization (optional)
    updateUrl: true, // A boolean indicating if url should be updated with the concept id (optional)
  };

  onClick(): void {
  console.log(window.location.pathname.slice(1));
}

  ngOnInit() {
    //document.getElementsByClassName("svg-content").item(0).addEventListener("click", this.onClick);

  }

  ngAfterContentChecked() {
    if (!this.rendered) {
      let element = document.getElementsByClassName("svg-content").item(0);
      if (element) {
        element.addEventListener("click", this.onClick, true);
        this.rendered = true;
        }
      }
  }

}
