import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBureauComponent } from './add-bureau.component';

describe('AddBureauComponent', () => {
  let component: AddBureauComponent;
  let fixture: ComponentFixture<AddBureauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBureauComponent]
    });
    fixture = TestBed.createComponent(AddBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
