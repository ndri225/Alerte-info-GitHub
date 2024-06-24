import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';

@Component({
    selector: 'app-add-fonction',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './add-fonction.component.html',
    styleUrls: ['./add-fonction.component.css']
})
export class AddFonctionComponent implements OnInit {


    public fonction: string = '';
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;



    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddFonctionComponent>,

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.fonction = this.data.fonction;
            this.item_slug= this.data.slug;

        }
    }





    saveFonction() {

        if (this.fonction == '') {
            this._notificationService.openSnackBarSimpleError("La fonction est obligatoire");
            return
        }

        const data = {
            fonction: this.fonction.toUpperCase()
        }


        this.is_loading = true;



        this._traitement.saveFonction(data).subscribe({

            next: (response: any) => {
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
            }
        })

    }


    updateFonction() {

        if (this.fonction == '') {
            this._notificationService.openSnackBarSimpleError("La fonction est obligatoire");
            return
        }


        const data = {
            fonction: this.fonction.toUpperCase()
        }

        this.is_loading = true;

        this._traitement.updateFonction(data, this.item_slug).subscribe({

            next: (response: any) => {
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
            }
        })

    }

}
