import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCongeComponent } from './add-type-conge.component';

describe('AddTypeCongeComponent', () => {
  let component: AddTypeCongeComponent;
  let fixture: ComponentFixture<AddTypeCongeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTypeCongeComponent]
    });
    fixture = TestBed.createComponent(AddTypeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
