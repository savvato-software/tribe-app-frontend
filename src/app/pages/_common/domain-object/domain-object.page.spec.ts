import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomainObjectPage } from './domain-object.page';

xdescribe('DomainObjectPage', () => {

  // TODO: Need to figure out how to pass an object to the constructor of this page.
  //
  // Other pages extend this class, and pass in an object with parameters so it can do its thing.
  //  Do we even need to test this page, since its functionality might/should be covered in other tests? Hmmm.

  let component: DomainObjectPage;
  let fixture: ComponentFixture<DomainObjectPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainObjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomainObjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
