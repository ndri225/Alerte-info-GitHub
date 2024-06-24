import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@Component({
    selector: 'app-customer-detail-conges',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
    templateUrl: './customer-detail-conges.component.html',
    styleUrl: './customer-detail-conges.component.css',
})
export class CustomerDetailCongesComponent implements OnInit {

    public conge_data: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CustomerDetailCongesComponent>,
    ){
        registerLocaleData(fr.default);
    }


    ngOnInit(): void {

        if (this.data != null) {
            this.conge_data = this.data;
        }
    }
}
