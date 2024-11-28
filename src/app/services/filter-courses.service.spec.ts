import { TestBed } from '@angular/core/testing';

import { FilterCoursesService } from './filter-courses.service';

describe('FilterCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterCoursesService = TestBed.get(FilterCoursesService);
    expect(service).toBeTruthy();
  });
});
