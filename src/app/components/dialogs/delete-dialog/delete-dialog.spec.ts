import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DeleteDialog } from "./delete-dialog";
import { By } from "@angular/platform-browser";
import { CloseButton } from "../../buttons/close-button/close-button";
import { DeleteButton } from "../../buttons/delete-button/delete-button";


describe('Delete-Dialog-Component', () => {
  let component: DeleteDialog;
  let fixture: ComponentFixture<DeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should emit true when closeEvent is called", () => {
      const closeSpy = vi.spyOn(component.onClose, 'emit')
      component.closeEvent()

      expect(closeSpy).toHaveBeenCalledWith(true)
  })

  it("should emit true when deleteEvent is called", () => {
    const deleteSpy = vi.spyOn(component.onDelete, 'emit')
    component.deleteEvent()

    expect(deleteSpy).toHaveBeenCalledWith(true)
  })

  it("should trigger closeEvent when app-close-button emits onClose", () => {
     const closeSpy = vi.spyOn(component, 'closeEvent')
     const closeBtn = fixture.debugElement.query(By.directive(CloseButton))
     closeBtn?.triggerEventHandler('onClose', null)

     expect(closeSpy).toHaveBeenCalled()
  })

  it("should trigger deleteEvent when app-delete-button emits onDelete", () => { 
    const deleteSpy = vi.spyOn(component, 'deleteEvent')
    const deleteBtn = fixture.debugElement.query(By.directive(DeleteButton))
    deleteBtn?.triggerEventHandler('onDelete', null)

    expect(deleteSpy).toHaveBeenCalled()
  })

  it("should render the modal backdrop with correct tailwind classes", () => {
      const backdrop = fixture.debugElement.query(By.css('.fixed.inset-0'))
      expect(backdrop).toBeTruthy()
      expect(backdrop.nativeElement.classList).toContain('bg-opacity-25')
      expect(backdrop.nativeElement.classList).toContain('justify-center')
  })


})
