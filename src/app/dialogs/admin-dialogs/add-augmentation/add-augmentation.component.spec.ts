import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAugmentationComponent } from './add-augmentation.component';

describe('AddAugmentationComponent', () => {
  let component: AddAugmentationComponent;
  let fixture: ComponentFixture<AddAugmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAugmentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAugmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
