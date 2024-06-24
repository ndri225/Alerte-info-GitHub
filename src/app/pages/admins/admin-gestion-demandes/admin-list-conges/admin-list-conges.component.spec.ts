import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListCongesComponent } from './admin-list-conges.component';

describe('AdminListCongesComponent', () => {
  let component: AdminListCongesComponent;
  let fixture: ComponentFixture<AdminListCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
