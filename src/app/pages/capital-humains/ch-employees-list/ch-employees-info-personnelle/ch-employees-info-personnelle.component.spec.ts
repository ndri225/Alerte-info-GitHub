import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesInfoPersonnelleComponent } from './ch-employees-info-personnelle.component';

describe('ChEmployeesInfoPersonnelleComponent', () => {
  let component: ChEmployeesInfoPersonnelleComponent;
  let fixture: ComponentFixture<ChEmployeesInfoPersonnelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesInfoPersonnelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesInfoPersonnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
