import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import { Dashboard } from './dashboard';
import { selectUser } from '../../store/auth.store';
import { Role } from '../../shared/enums';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let store: MockStore
  let mockUserSelector: any

  const mockUser = {
    id: 1,
    email: "test@gmail.com",
    role: Role.ADMIN,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
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

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore)

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have lorem text", () => {
    expect(component.lorem).toContain("Lorem ipsum")
    expect(component.lorem).toBeTruthy()
  })

  it("should have role", () => {
    expect(component.role()).toBe(mockUser.role)
  })

  it("should have email", () => {
    expect(component.email()).toBe(mockUser.email)
  })

  it("should defined email", () => {
    expect(component.email()).toBeDefined()
  })

  it("should react to store changes", () => {
    let user: any
    component.user.subscribe(value => {
      user = value
    })
    expect(user.email).toBe(mockUser.email)

    store.overrideSelector(selectUser, {id: 1, email: "test2@gmail.com", role: Role.USER})
    store.refreshState()

    component.user.subscribe(value => {
      expect(value?.email).toBe('test2@gmail.com')
    })
  })

});
