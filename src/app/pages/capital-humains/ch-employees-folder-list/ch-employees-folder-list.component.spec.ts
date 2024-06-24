import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmployeesFolderListComponent } from './ch-employees-folder-list.component';

describe('ChEmployeesFolderListComponent', () => {
  let component: ChEmployeesFolderListComponent;
  let fixture: ComponentFixture<ChEmployeesFolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmployeesFolderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmployeesFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
