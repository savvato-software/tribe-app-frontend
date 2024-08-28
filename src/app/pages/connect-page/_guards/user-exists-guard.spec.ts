import { TestBed } from '@angular/core/testing';

import { UserExistsGuardGuard } from './user-exists-guard.guard';

describe('UserExistsGuardGuard', () => {
  let guard: UserExistsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserExistsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
