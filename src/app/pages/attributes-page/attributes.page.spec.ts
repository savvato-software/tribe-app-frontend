import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";

import { AttributesPage } from './attributes.page';
import {HttpClientModule} from "@angular/common/http";

import { Constants } from '../../_constants/constants';
import {SharedComponentsModule} from "../../_shared-components/shared-components/shared-components.module";
import { LoadingService } from '../../_services/loading-spinner/loading.service';
import { AttributesModelService } from "./_services/attributes.model.service";
import { of } from 'rxjs';

describe('AttributesPage', () => {
  let component: AttributesPage;
  let fixture: ComponentFixture<AttributesPage>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let attributesModelServiceSpy: jasmine.SpyObj<AttributesModelService>;

  beforeEach(waitForAsync(() => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'dismiss']);
    attributesModelServiceSpy = jasmine.createSpyObj('AttributesModelService', ['init', 'get', 'isDirty']);
    
    loadingServiceSpy.show.and.returnValue(Promise.resolve());
    loadingServiceSpy.dismiss.and.returnValue(Promise.resolve());
    attributesModelServiceSpy.init.and.returnValue(Promise.resolve());
    attributesModelServiceSpy.get.and.returnValue([]);
    attributesModelServiceSpy.isDirty.and.returnValue(false);

    TestBed.configureTestingModule({
      declarations: [ AttributesPage ],
      providers: [
        { provide: Constants, useClass: Constants },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: AttributesModelService, useValue: attributesModelServiceSpy }
      ],
        
      
      imports: [HttpClientModule, SharedComponentsModule, RouterTestingModule.withRoutes([]), IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
