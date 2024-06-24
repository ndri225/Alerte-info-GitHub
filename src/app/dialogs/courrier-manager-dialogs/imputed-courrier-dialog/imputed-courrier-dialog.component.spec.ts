import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputedCourrierDialogComponent } from './imputed-courrier-dialog.component';

describe('ImputedCourrierDialogComponent', () => {
  let component: ImputedCourrierDialogComponent;
  let fixture: ComponentFixture<ImputedCourrierDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImputedCourrierDialogComponent]
    });
    fixture = TestBed.createComponent(ImputedCourrierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
