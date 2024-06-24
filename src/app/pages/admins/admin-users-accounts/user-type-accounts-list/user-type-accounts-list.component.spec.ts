import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeAccountsListComponent } from './user-type-accounts-list.component';

describe('UserTypeAccountsListComponent', () => {
  let component: UserTypeAccountsListComponent;
  let fixture: ComponentFixture<UserTypeAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeAccountsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTypeAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
