import { TestBed } from '@angular/core/testing';

import { ChallengeCodeService } from './challenge-code.service';

describe('ChallengeCodeService', () => {
  let service: ChallengeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
