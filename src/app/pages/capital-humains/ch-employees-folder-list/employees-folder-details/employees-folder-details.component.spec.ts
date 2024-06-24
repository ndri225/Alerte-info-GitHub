import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFolderDetailsComponent } from './employees-folder-details.component';

describe('EmployeesFolderDetailsComponent', () => {
  let component: EmployeesFolderDetailsComponent;
  let fixture: ComponentFixture<EmployeesFolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesFolderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesFolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
