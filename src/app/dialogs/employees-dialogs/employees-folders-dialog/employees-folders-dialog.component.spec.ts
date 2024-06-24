import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFoldersDialogComponent } from './employees-folders-dialog.component';

describe('EmployeesFoldersComponent', () => {
    let component: EmployeesFoldersDialogComponent;
    let fixture: ComponentFixture<EmployeesFoldersDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeesFoldersDialogComponent],
        });
        fixture = TestBed.createComponent(EmployeesFoldersDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
