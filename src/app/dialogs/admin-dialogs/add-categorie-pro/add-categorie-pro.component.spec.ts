import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorieProComponent } from './add-categorie-pro.component';

describe('AddCategorieProComponent', () => {
  let component: AddCategorieProComponent;
  let fixture: ComponentFixture<AddCategorieProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategorieProComponent]
    });
    fixture = TestBed.createComponent(AddCategorieProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
