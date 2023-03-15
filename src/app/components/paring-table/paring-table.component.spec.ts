import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParingTableComponent } from './paring-table.component';

describe('ParingTableComponent', () => {
  let component: ParingTableComponent;
  let fixture: ComponentFixture<ParingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
