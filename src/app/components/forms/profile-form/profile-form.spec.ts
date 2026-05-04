import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileForm } from './profile-form'
import { USER_TYPE } from '../../../shared/types';
import { Role } from '../../../shared/enums';
import { mock } from 'node:test';

describe('ProfileForm-Component', () => {
  let component: ProfileForm;
  let fixture: ComponentFixture<ProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("has role", () => {
    expect(component.profileForm.role).toBeTruthy()
  })

  it('has email', () => {
    expect(component.profileForm.email).toBeTruthy()
  })

  it("shoud update profile", async () => {
    const mockUser: USER_TYPE = {
      id: 1,
      email: "admin@gmail.com",
      role: Role.ADMIN,
    }

    fixture.componentRef.setInput("defaultUser", mockUser)
    //fixture.componentRef.("onSubmit", () => {})
    fixture.componentRef.setInput("title", "test")
    fixture.detectChanges()
    await fixture.whenStable();
    expect(component.defaultUser()).toBe(mockUser)

    expect(component.profileModel().email).toBe(mockUser.email)
    expect(component.profileModel().role).toBe("admin")

    expect(component.u()).toBe(mockUser)

    let emitted = false
    component.onSubmit.subscribe(() => {
      emitted = true
    })
    component.handleOnSubmit(new Event('submit'))
    expect(emitted).toBeTruthy()
    expect(emitted).toBe(true)

    //----
    let emittedData: any = null

    component.onSubmit.subscribe((data: any) => {
      emittedData = data
    })
    component.handleOnSubmit(new Event('submit') as SubmitEvent)
    //expect(emittedData).toBe(mockUser)
    expect(emittedData).not.toBeNull()
    expect(emittedData.id).toBe(1)
    expect(emittedData.email).toBe("admin@gmail.com")

  })

  it("should submit", () => {
     const mockUser: USER_TYPE = {
      id: 1,
      email: "admin@gmail.com",
      role: Role.ADMIN,
    }

     fixture.componentRef.setInput("title", "test")
    fixture.componentRef.setInput("defaultUser", mockUser)
    fixture.detectChanges()

    let emittedData: any = null

    component.onSubmit.subscribe((data: any) => {
      emittedData = data
    })
    component.handleOnSubmit(new Event('submit') as SubmitEvent)
    expect(emittedData).toStrictEqual(mockUser)
    expect(emittedData).not.toBeNull()
    expect(emittedData.id).toStrictEqual(1)
    expect(emittedData.email).toStrictEqual("admin@gmail.com")
  })

  it("should update title", async () => {
    fixture.componentRef.setInput("title", "Edit Profile")
    fixture.detectChanges()
    await fixture.whenStable();
    expect(component.title()).toBe("Edit Profile")
  })

  it("should handle submission", async () => {

    const mockEvent = { preventDefault: vi.fn() } as unknown as Event
    const emitSpy = vi.spyOn(component.onSubmit, 'emit')

    component.handleOnSubmit(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(emitSpy).toHaveBeenCalled()



  })


});
