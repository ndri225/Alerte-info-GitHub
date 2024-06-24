import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesGestionPaieComponent } from './ch-employees-gestion-paie.component';

describe('ChEmployeesGestionPaieComponent', () => {
  let component: ChEmployeesGestionPaieComponent;
  let fixture: ComponentFixture<ChEmployeesGestionPaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesGestionPaieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesGestionPaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
