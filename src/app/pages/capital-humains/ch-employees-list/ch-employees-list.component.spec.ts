import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesListComponent } from './ch-employees-list.component';

describe('ChEmployeesListComponent', () => {
  let component: ChEmployeesListComponent;
  let fixture: ComponentFixture<ChEmployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
