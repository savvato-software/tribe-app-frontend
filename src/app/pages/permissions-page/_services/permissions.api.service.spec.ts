import { PermissionsApiService } from "./permissions.api.service";
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { UserRole } from '../_types/user-role.type';
import { User } from '../_types/user.type';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";



// describe("PermissionsApiService", () => {
//     let service: PermissionsApiService;
//     let expectation: boolean = false;
//     let userRole: UserRole;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [PermissionsApiService],
//             imports: [ IonicModule.forRoot(), HttpClientModule]
//         });
//         service = TestBed.inject(PermissionsApiService);
//     });

    // it('should return false from testOfTest', () => {
    //     const result = service.testOfTest();
    //     expect(result).toEqual(true);
    // });

    // it('should return false from testOfTest', () => {
    //     const result = service.getListOfRoles();
    //     let role = userRole;

    //     expect(result).toEqual(true);
    // });

    
// });


// describe("permissionsApiService" , () => {
//     let service: PermissionsApiService;
//     let expectation = false;
//     let response: boolean;

//     it('should return false', () => {
//         spyOn(service, 'testOfTest').and.returnValue(of(expectation) as any);

//         service.testOfTest().subscribe((res: boolean) => {
//             response = res;
//             expect(response).toBe(expectation);
//         });
        

        
//     })
// });