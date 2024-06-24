import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesCongesComponent } from './ch-employees-conges.component';

describe('ChEmployeesCongesComponent', () => {
  let component: ChEmployeesCongesComponent;
  let fixture: ComponentFixture<ChEmployeesCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
