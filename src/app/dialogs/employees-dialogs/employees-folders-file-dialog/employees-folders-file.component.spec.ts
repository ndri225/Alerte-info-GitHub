import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFoldersFileComponent } from './employees-folders-file.component';

describe('EmployeesFoldersFileComponent', () => {
  let component: EmployeesFoldersFileComponent;
  let fixture: ComponentFixture<EmployeesFoldersFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesFoldersFileComponent]
    });
    fixture = TestBed.createComponent(EmployeesFoldersFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
