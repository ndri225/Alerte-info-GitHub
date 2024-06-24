import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';

@Component({
    selector: 'app-employees-folders-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
    ],
    templateUrl: './employees-folders-dialog.component.html',
    styleUrls: ['./employees-folders-dialog.component.css']
})
export class EmployeesFoldersDialogComponent implements OnInit {


    public author_dossiers: any;
    public is_update: boolean = false;
    public item_slug: any;
    public fonction: string = '';
    public list_employes: any = [];
    public libelle_dossiers: string = '';

    public employe_matricule: string = '';

    public is_loading: boolean = false;



    public selectedEmployeOption: any;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<EmployeesFoldersDialogComponent>,
        private _userData: UserDataManagerService,

    ) { }


    ngOnInit() {

        this.employe_matricule = this._userData.getUserData().employe_matricule;

        this.libelle_dossiers = this._userData.getUserData().name.toUpperCase();

        console.log(this.data)
        if (this.data != null) {

            this.is_update = true;
            this.libelle_dossiers = this.data.libelle_dossiers;
            this.employe_matricule = this.data.employe_matricule;
            this.item_slug = this.data.slug;

        }
    }



    saveDossiers() {

        if (this.libelle_dossiers == '') {
            this._notificationService.openSnackBarSimpleError("La libellé du dossier est obligatoire");
            return
        }

        if (this.employe_matricule == undefined) {
            this._notificationService.openSnackBarSimpleError("Le propriétaire du dossier est obligatoire");
            return
        }

        const data = {
            libelle_dossiers: this.libelle_dossiers.toUpperCase(),
            employe_matricule: this.employe_matricule ,
        }



        this.is_loading = true;



        this._traitement.saveDossiers(data).subscribe({

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


    updateDossiers() {

        if (this.libelle_dossiers == '') {
            this._notificationService.openSnackBarSimpleError("La libellé du dossier est obligatoire");
            return
        }

        if (this.employe_matricule == undefined) {
            this._notificationService.openSnackBarSimpleError("Le propriétaire du dossier est obligatoire");
            return
        }

        const data = {
            libelle_dossiers: this.libelle_dossiers.toUpperCase(),
            employe_matricule: this.employe_matricule ,
        }

        this.is_loading = true;

        this._traitement.updateDossiers(data, this.item_slug).subscribe({

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
}
