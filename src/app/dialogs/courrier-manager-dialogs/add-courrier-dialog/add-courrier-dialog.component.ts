import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-courrier-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './add-courrier-dialog.component.html',
    styleUrls: ['./add-courrier-dialog.component.css']
})
export class AddCourrierDialogComponent implements OnInit {

    public date_started: Date = new Date();
    public provenance: string = '';
    public objet_courrier: string = '';

    public is_update: boolean = false;
    public is_loading: boolean = false;
    public item_slug: string = '';

    public document_courriers!: File;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCourrierDialogComponent>,
    ){}

    ngOnInit(): void {

        if(this.data != undefined)
        {
            this.provenance = this.data.provenance;
            this.objet_courrier = this.data.objet_courrier;
            this.date_started = new Date(this.data.date_started);
            this.item_slug = this.data.slug;
            this.is_update = true;
        }
    }


    uploadFile(e: any) {
        this.document_courriers = e.target.files[0];
    }


    saveCourrier()
    {


        if (this.provenance == '') {
            this._notificationService.openSnackBarSimpleError("La provenance du courrier est obligatoire");
            return
        }

        if (this.objet_courrier == '') {
            this._notificationService.openSnackBarSimpleError("L'objet du courrier est obligatoire");
            return
        }

        const formData: FormData = new FormData();

        formData.append("date_started", this.formatDate(this.date_started));
        formData.append("provenance", this.provenance);
        formData.append("objet_courrier", this.objet_courrier);
        formData.append("document_courriers", this.document_courriers != undefined ? this.document_courriers : "");


        //console.log(this.document_courriers);
        //return

        this.is_loading = true;

        this._traitement.saveCourrier(formData).subscribe({

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
            }
        })
    }

    updateCourrier()
    {
        if (this.provenance == '') {
            this._notificationService.openSnackBarSimpleError("La provenance du courrier est obligatoire");
            return
        }

        if (this.objet_courrier == '') {
            this._notificationService.openSnackBarSimpleError("L'objet du courrier est obligatoire");
            return
        }

        const formData: FormData = new FormData();

        formData.append("date_started", this.formatDate(this.date_started));
        formData.append("provenance", this.provenance);
        formData.append("objet_courrier", this.objet_courrier);
        formData.append("document_courriers", this.document_courriers == undefined ? "" :this.document_courriers );

        this.is_loading = true;

        this._traitement.updateCourrier(formData, this.item_slug).subscribe({

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
            }
        })
    }
    // FORMAT DATE FUNCTION

    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }
}
