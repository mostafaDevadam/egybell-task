import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Unauthorized } from './unauthorized'

describe('Unauthorized-Page', () => {
  let component: Unauthorized;
  let fixture: ComponentFixture<Unauthorized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unauthorized],
    }).compileComponents();

    fixture = TestBed.createComponent(Unauthorized);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display unauthorized message", () => {
     const pEl: HTMLElement = fixture.nativeElement.querySelector('p');
     expect(pEl.textContent).toContain('unauthorized works!');
  });
});
