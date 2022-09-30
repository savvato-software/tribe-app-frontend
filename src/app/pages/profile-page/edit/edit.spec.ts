import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopicPage } from './edit';

describe('EditTopicPage', () => {
    let component: EditTopicPage;
    let fixture: ComponentFixture<EditTopicPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditTopicPage ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditTopicPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
