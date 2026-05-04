import { ComponentFixture, flush, TestBed } from '@angular/core/testing';
import {EditProfile} from './edit-profile'
import { ProfileForm } from '../forms/profile-form/profile-form';
import { Role } from '../../shared/enums';
import { inject } from 'vitest';
import { UsersService } from '../../services/users';
import { MessageService } from '../toast-uis/message/message-service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { RESPONSE_TYPE, USER_TYPE } from '../../shared/types';
import { By } from '@angular/platform-browser';


describe('EditProfile-Component (Integration)', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;
  let usersService: UsersService
  let messageService: MessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfile, ProfileForm],
      providers: [
        {
          provide: UsersService,
          useValue: {
            updateUser: vi.fn()
          }
        },
        {
          provide: MessageService,
          useValue: {
            showStacked: vi.fn()
          }
        }
      ]
    }).compileComponents(); 

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
     usersService = TestBed.inject(UsersService)
     messageService = TestBed.inject(MessageService)
     fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should be created with injected services", () => {
     expect(usersService).toBeDefined()
     expect(messageService).toBeDefined()
  })

  it("should pass user data to profile-form", async () => {
    const mockUser: USER_TYPE = { id: 1, email: 'admin@gmail.com', role: Role.ADMIN };
    const mockResponse: RESPONSE_TYPE<USER_TYPE> = {message: "", data: mockUser, statusCode: 200}
    const saveSpy = vi.spyOn(component, 'update')
    .mockImplementation(() => Promise.resolve())
    //fixture.componentRef.setInput("defaultUser", mockUser)

    const serviceSpy = vi.spyOn(usersService, 'updateUser')
    .mockReturnValue(of(mockResponse) as any) //() => of(mockResponse))
    //.mockImplementation(async () => of(mockResponse))

     //const res = firstValueFrom(await usersService.updateUser(1, mockUser))
     //vi.spyOn(usersService, 'updateUser').mockReturnValue(res)

     await component.update(mockUser)

     //flush()
     const msgySpy = vi.spyOn(messageService, 'showStacked')
     vi.spyOn(usersService, 'updateUser').mockReturnValue(of(mockResponse) as any)
     await component.update(mockUser)

     await new Promise(resolve => setTimeout(resolve, 1000));

     //expect(msgySpy).toHaveBeenCalledWith("Updated User is successfully", 4)
    
     //expect(messageService.showStacked).toHaveBeenCalledWith("Updated User is successfully", 4)

     fixture.componentInstance.user = mockUser as any
     //fixture.detectChanges()
     await fixture.whenStable();

     const childDebugEl = fixture.debugElement.query(By.directive(ProfileForm))
     expect(childDebugEl?.componentInstance?.defaultUser()).toEqual(undefined)

     //expect(childDebugEl).toBeTruthy()
    await fixture.whenStable();
    childDebugEl?.componentInstance?.defaultUser()
    childDebugEl?.componentInstance?.onSubmit.emit(mockUser)
     
    const updateSpy = vi.spyOn(component, 'update')

    expect(updateSpy).toHaveBeenCalledWith(mockUser)

  })

 
});
