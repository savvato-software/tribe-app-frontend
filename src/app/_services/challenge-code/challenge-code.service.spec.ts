import { TestBed } from '@angular/core/testing';

import { ChallengeCodeService } from './challenge-code.service';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { Constants } from '../../_constants/constants';

describe('ChallengeCodeService', () => {
  let service: ChallengeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([])]
    });
    service = TestBed.inject(ChallengeCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
