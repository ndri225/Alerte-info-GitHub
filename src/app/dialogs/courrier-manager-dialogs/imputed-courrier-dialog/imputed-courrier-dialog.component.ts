import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';

@Component({
    selector: 'app-imputed-courrier-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './imputed-courrier-dialog.component.html',
    styleUrls: ['./imputed-courrier-dialog.component.css']
})
export class ImputedCourrierDialogComponent implements OnInit {

    public date_imputation: Date = new Date();
    public date_execution: Date = new Date();
    public courrier_ref: string = '';
    public objet_courrier: string = '';
    public employee_matricule: string = '';

    public is_update: boolean = false;
    public is_loading: boolean = false;
    public item_slug: string = '';
    public responsable_service_list: any[] = [];
    public responsable_service: any;

    public selectedResponsableServiceListOption: any;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<ImputedCourrierDialogComponent>,
        private _users_connected: UserDataManagerService,
    ){}


    ngOnInit(): void {

        if(this.data != undefined)
        {
            if(this.data.action == "open"){
                //console.log(this.data)
                this.courrier_ref = this.data.data.courrier_ref;
                this.objet_courrier = this.data.data.objet_courrier;
                this.is_update = false;
            }
            if(this.data.action == "update"){
                this.courrier_ref = this.data.data.courrier_ref;
                this.objet_courrier = this.data.data.objet_courrier;
                this.selectedResponsableServiceListOption = this.data.data.employee_matricule;
                this.date_imputation = new Date(this.data.data.date_imputation);
                this.date_execution = new Date(this.data.data.date_execution);
                this.item_slug = this.data.data.slug;
                this.is_update = true;
            }
            if(this.data.action == "update_imputer"){
                this.courrier_ref = this.data.data.courrier_ref;
                this.objet_courrier = this.data.data.objet_courrier;
                this.selectedResponsableServiceListOption = this.data.data.employee_matricule;
                this.date_imputation = new Date(this.data.data.date_imputation);
                this.date_execution = new Date(this.data.data.date_execution);
                this.item_slug = this.data.data.slug;
                this.is_update = true;
            }

        }

        this.getResponsableServiceList();
    }


    getResponsableServiceList() {

        this._traitement.getResponsableServiceList().subscribe({

            next: (response: any) => {
                //console.log(response);
                this.responsable_service_list = response;
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


    selectResponsableService(event: any) {
        this.employee_matricule = event.value;
    }
    saveCourrierImputedData()
    {


        if (this.courrier_ref == '') {
            this._notificationService.openSnackBarSimpleError(
                'La référence du courrier est obligatoire'
            );
            return;
        }

        if (this.employee_matricule == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le responsable du service est obligatoire'
            );
            return;
        }



        const data = {
            date_imputation: this.formatDate(this.date_imputation),
            date_execution: this.formatDate(this.date_execution),
            courrier_ref: this.courrier_ref ,
            objet_courrier: this.objet_courrier ,
            employee_matricule: this.employee_matricule ,
        }

        //return;

        this.is_loading = true;

        this._traitement.saveCourrierImputedData(data).subscribe({

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

    updateCourrierImputedData()
    {
        if (this.courrier_ref == '') {
            this._notificationService.openSnackBarSimpleError(
                'La référence du courrier est obligatoire'
            );
            return;
        }

        if (this.employee_matricule == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le responsable du service est obligatoire'
            );
            return;
        }



        const data = {
            date_imputation: this.formatDate(this.date_imputation),
            date_execution: this.formatDate(this.date_execution),
            courrier_ref: this.courrier_ref ,
            objet_courrier: this.objet_courrier ,
            employee_matricule: this.employee_matricule ,
        }


        this._traitement.updateCourrierImputedData(data, this.item_slug).subscribe({

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
