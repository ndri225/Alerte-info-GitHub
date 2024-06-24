import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFoldersComponent } from './customer-folders.component';

describe('CustomerFoldersComponent', () => {
  let component: CustomerFoldersComponent;
  let fixture: ComponentFixture<CustomerFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFoldersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
