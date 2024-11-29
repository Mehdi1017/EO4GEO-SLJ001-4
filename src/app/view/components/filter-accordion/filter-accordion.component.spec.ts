import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterAccordionComponent } from "./filter-accordion.component";

describe("NavbarComponent", () => {
  let component: FilterAccordionComponent;
  let fixture: ComponentFixture<FilterAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAccordionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
