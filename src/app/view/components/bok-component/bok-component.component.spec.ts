import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BokComponentComponent } from './bok-component.component';

describe('BokComponentComponent', () => {
  let component: BokComponentComponent;
  let fixture: ComponentFixture<BokComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BokComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BokComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
