import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourrierDialogComponent } from './add-courrier-dialog.component';

describe('AddCourrierDialogComponent', () => {
  let component: AddCourrierDialogComponent;
  let fixture: ComponentFixture<AddCourrierDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourrierDialogComponent]
    });
    fixture = TestBed.createComponent(AddCourrierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
