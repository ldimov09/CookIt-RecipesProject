import { TestBed } from '@angular/core/testing';

import { StringResourcesService } from './string-resources.service';

describe('StringResourcesService', () => {
  let service: StringResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
