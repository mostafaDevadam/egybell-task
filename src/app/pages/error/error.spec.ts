import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error } from './error'

describe('Error-Page', () => {
  let component: Error;
  let fixture: ComponentFixture<Error>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error],
    }).compileComponents();

    fixture = TestBed.createComponent(Error);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display error message", () => {
     const pEl: HTMLElement = fixture.nativeElement.querySelector('p');
     expect(pEl.textContent).toContain('error works!');
  });
});
