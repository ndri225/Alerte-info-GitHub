import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceNonJustifieComponent } from './absence-non-justifie.component';

describe('AbsenceNonJustifieComponent', () => {
  let component: AbsenceNonJustifieComponent;
  let fixture: ComponentFixture<AbsenceNonJustifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceNonJustifieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenceNonJustifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
