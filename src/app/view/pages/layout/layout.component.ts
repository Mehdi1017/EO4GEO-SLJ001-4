import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as bok from '@eo4geo/find-in-bok-dataviz';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ModalOptions} from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { timeout } from 'd3';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    console.log('Hello World!')
  }
}
