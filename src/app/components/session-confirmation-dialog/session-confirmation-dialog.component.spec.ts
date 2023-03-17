import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionConfirmationDialogComponent } from './session-confirmation-dialog.component';

describe('SessionConfirmationDialogComponent', () => {
  let component: SessionConfirmationDialogComponent;
  let fixture: ComponentFixture<SessionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
