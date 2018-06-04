import { TestBed, inject } from '@angular/core/testing';

import { CatalogueService } from './catalogue.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueService]
    });
  });

  it('should be created', inject([CatalogueService], (service: CatalogueService) => {
    expect(service).toBeTruthy();
  }));
});
