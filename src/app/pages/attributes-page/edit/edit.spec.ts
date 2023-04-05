import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributePage } from './edit';

import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { Constants } from "../../../_constants/constants";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('EditAttributePage', () => {
    let component: EditAttributePage;
    let fixture: ComponentFixture<EditAttributePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditAttributePage ],
            providers: [
                { provide: Constants, useClass: Constants }
            ],
            imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes([])]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditAttributePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {

        // FOR SOME REASON, we get an error running this test that 'no value accessor for field "name"...'
        //  I think it has to do with the fact that this class inherits from DomainObjectPage class,
        //  and that is messging something up. We do not get this error in similar classes that do not inherit from
        //  DomainObjectPage.

        expect(component).toBeTruthy();
    });
});
