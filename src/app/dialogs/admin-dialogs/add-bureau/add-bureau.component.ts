import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-bureau',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './add-bureau.component.html',
    styleUrls: ['./add-bureau.component.css'],
})
export class AddBureauComponent implements OnInit {
    public bureau: string = '';
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddBureauComponent>
    ) {}

    ngOnInit() {
        if (this.data != null) {
            this.is_update = true;
            this.bureau = this.data.bureau;
            this.item_slug = this.data.slug;
        }
    }

    saveBureau() {
        if (this.bureau == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le bureau est obligatoire'
            );
            return;
        }

        const data = {
            bureau: this.bureau.toUpperCase(),
        };

        this.is_loading = true;

        this._traitement.saveBureau(data).subscribe({
            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
                    this._notificationService.openSnackBarSuccess(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }

    updateBureau() {
        if (this.bureau == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le bureau est obligatoire'
            );
            return;
        }

        const data = {
            bureau: this.bureau.toUpperCase(),
        };

        this.is_loading = true;

        this._traitement.updateBureau(data, this.item_slug).subscribe({
            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }
}
