import { TestBed } from '@angular/core/testing';

import { SubcategoriesService } from './subcategoriesService';

describe('Subcategories', () => {
  let service: SubcategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
