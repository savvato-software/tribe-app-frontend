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
            { id: 1, name: 'admin' },
            { id: 2, name: 'accountholder' },
            { id: 3, name: 'phrasereviewer' }
        ];

        service.getListOfRoles().then((result) => {
            expect(result).toEqual(mockUserRoles);
            done(); // Signal that the async test is complete
        });

        const req = httpTestingController.expectOne(`${environment.apiUrl}/api/permissions/user-roles-list`);
        expect(req.request.method).toEqual('GET');

        req.flush(mockUserRoles); // Provide the mock response
    });

    it("should return array with user objects", (done) => {
        const mockUserRoles: User[] = [
            {
                id:  1,
                name: "admin",
                password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                phone: "3035551212",
                email: "admin@tribeapp.com",
                enabled: 1,
                created: "2024-08-01 13:10:25.0",
                lastUpdated: "2024-08-01 13:10:25.0",
                roles: [{name: 'ROLE_admin', id: 1},
                    {name: 'ROLE_accountholder', id: 2}]
            },
            {
                id: 2,
                name: "testuser",
                password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                phone: "3035551213",
                email: "testuser@tribeapp.com",
                enabled: 1,
                created: "2024-08-01 13:10:25.0",
                lastUpdated: "2024-08-01 13:10:25.0",
                roles: [{name: 'ROLE_admin', id: 1},
                    {name: 'ROLE_accountholder', id: 2}]
            },
            {
                id: 3,
                name: "testuser2",
                password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                phone: "3035551214",
                email: "testuser2@tribeapp.com",
                enabled: 1,
                created: "2024-08-01 13:11:30.0",
                lastUpdated: "2024-08-01 13:11:30.0",
                roles: [{name: 'ROLE_accountholder', id: 2},
                    {name: "ROLE_phrasereviewer", id: 3}]
            }
        ];

        service.getListOfAllUsers().then((result) => {
            expect(result).toEqual(mockUserRoles);
            done(); // Signal that the async test is complete
        });

        const req = httpTestingController.expectOne(`${environment.apiUrl}/api/permissions/users`);
        expect(req.request.method).toEqual('GET');

        req.flush(mockUserRoles); // Provide the mock response 
    });

    it('should save roles and return success message', (done) => {
        const mockRoles = [
            { id: 1, name: 'ROLE_admin' },
            { id: 2, name: 'ROLE_accountholder' }
        ];
    
        const mockResponse = { message: 'Roles saved successfully' };
    
        service.save(mockRoles).then((result) => {
            // Check if the result indicates success
            expect(result).toEqual({ successful: mockResponse });
            done(); // Signal the test is complete
        });
    
        // Verify the correct URL and method
        const req = httpTestingController.expectOne(`${environment.apiUrl}/api/permissions`);
        expect(req.request.method).toEqual('POST');
    
        // Check that the request body matches the roles array
        expect(req.request.body).toEqual(mockRoles);
    
        // Provide the mock response
        req.flush(mockResponse);
    });
   
    
});