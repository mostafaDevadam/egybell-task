import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Users } from './users';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '../../store/auth.store';
import { Role } from '../../shared/enums';
import { UsersService } from '../../services/users';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, tick, flush } from '@angular/core/testing';
import { environment } from '../../../environments/environment.development';


const apiUrl = environment.apiUrl


describe('Users-Page', () => {
    let component: Users;
    let fixture: ComponentFixture<Users>;
    let store: MockStore;
    let httpMock: HttpTestingController;
    let userService: UsersService;

    const mockUser = {
        id: 1,
        email: "test@gmail.com",
        role: Role.ADMIN,
    };

    const mockUsers = [
        {
            id: 1,
            email: "test1@gmail.com",
            role: Role.ADMIN,
        },
        {
            id: 2,
            email: "test2@gmail.com",
            role: Role.USER,
        },
        {
            id: 3,
            email: "test3@gmail.com",
            role: Role.USER,
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Users],
            providers: [
                UsersService,
                provideHttpClient(),
                provideHttpClientTesting(),
                provideMockStore({
                    selectors: [
                        {
                            selector: selectUser,
                            value: mockUser
                        }
                    ]
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Users);
        component = fixture.componentInstance;
        userService = TestBed.inject(UsersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it('should fetch a list of users', async () => {
        // 1. Setup the expected response shape based on your subscription logic
        const mockResponse = {
            statusCode: 201,
            message: "success",
            data: mockUsers
        };

        // 2. Initiate the request
        // Since your service returns a Promise of an Observable, we await the promise
        const usersObservable = await userService.fetchAllUsers();

        usersObservable.subscribe((response) => {
            expect(response.data.length).toBe(3);
            expect(response).toEqual(mockResponse);
        });

        //fixture.detectChanges();
        //await fixture.whenStable();

        // 3. Handle the HTTP Mocking
        // Use the exact URL from the error message
        const req = httpMock.expectOne(`${apiUrl}/users`);
        expect(req.request.method).toBe('GET');


        // 4. Flush the data to resolve the observable
        req.flush(mockResponse);


        //await fixture.whenStable(); // Wait for promises to resolve

        // 4. Update the view so the @Input() on the table component receives data
        //fixture.detectChanges();

        // 5. Verification: Check if the component's internal property is set
        // Assuming your component stores the list in a property named 'usersList'
        //expect(component.users()).toEqual(mockUsers)
    });



   


});