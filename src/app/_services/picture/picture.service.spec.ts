import { TestBed } from '@angular/core/testing';

import { PictureService } from './picture.service';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { Constants } from '../../_constants/constants';

describe('PictureService', () => {
  let service: PictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([])]
    });
    service = TestBed.inject(PictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
