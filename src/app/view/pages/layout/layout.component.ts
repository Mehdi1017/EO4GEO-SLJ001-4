import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as bok from "@eo4geo/find-in-bok-dataviz";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ModalOptions } from "ngx-bootstrap";
import { environment } from "src/environments/environment";
import { timeout } from "d3";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  items: Observable<any[]>;

  // get the data once during app initialization
  constructor(db: AngularFirestore) {
    this.items = db.collection("Courses").valueChanges();
  }

  ngOnInit() {
    console.log("Hello World!");
  }
}
