import { TestBed } from '@angular/core/testing';

import { NotloggedGuard } from './not-logged.guard';

describe('NotLoggedGuard', () => {
  let guard: NotloggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotloggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
