import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChWelcomeComponent } from './ch-welcome.component';

describe('ChWelcomeComponent', () => {
  let component: ChWelcomeComponent;
  let fixture: ComponentFixture<ChWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
