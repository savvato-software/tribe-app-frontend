import { PermissionsApiService } from "./permissions.api.service";
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { UserRole } from '../_types/user-role.type';
import { User } from '../_types/user.type';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"; // Use HttpClientTestingModule




describe("PermissionsApiService", () => {
    let service: PermissionsApiService;
    let expectation: boolean = false;
    let httpTestingController: HttpTestingController;
   

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionsApiService],
            imports: [ IonicModule.forRoot(), HttpClientModule, HttpClientTestingModule]
        });
        service = TestBed.inject(PermissionsApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify(); // Verify no outstanding requests after each test
    });

    it('should return false from testOfTest', () => {
        const result = service.testOfTest();
        expect(result).toEqual(false);
    });

    // it('should return userRoles from getListOfRoles', () => {
    //     const result = service.getListOfRolesTest();
    //     // let role: UserRole[] = userRole;
    //     // const result = ["one","two","three"];
    //     const expectation = ["one","two","three"];
    //     expect(result).toEqual(expectation);
    //     // expect(result).toEqual(role);
    // });

    it('should return userRoles from getListOfRoles', (done) => {
        const mockUserRoles: UserRole[] = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' },
            { id: 3, name: 'Guest' }
        ];

        service.getListOfRoles().then((result) => {
            expect(result).toEqual(mockUserRoles);
            done(); // Signal that the async test is complete
        });

        const req = httpTestingController.expectOne(`${environment.apiUrl}/api/permissions/user-roles-list`);
        expect(req.request.method).toEqual('GET');

        req.flush(mockUserRoles); // Provide the mock response
    });

    
    
});