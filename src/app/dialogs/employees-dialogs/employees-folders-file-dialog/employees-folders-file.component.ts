import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';

@Component({
    selector: 'app-employees-folders-file',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
    ],
    templateUrl: './employees-folders-file.component.html',
    styleUrls: ['./employees-folders-file.component.css']
})
export class EmployeesFoldersFileComponent implements OnInit {


    public dossiers_code: any;
    public is_update: boolean = false;
    public item_slug: any;
    public old_file: any;
    public file_url!: File;

    public libelle_file: string = '';
    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<EmployeesFoldersFileComponent>,

    ) { }


    ngOnInit() {

        if (Object.keys(this.data).length == 1) {
            this.dossiers_code = this.data.dossiers_code;

        }else{
            this.is_update = true;
            this.libelle_file = this.data.items_data.libelle_file;
            this.old_file = this.data.items_data.file_url;
            this.item_slug = this.data.items_data.slug;
            this.dossiers_code = this.data.dossiers_code;
        }
    }

    // Upload file
    uploadFile(e: any) {
        this.file_url = e.target.files[0];
    }


    saveDossiersFile() {


        if (this.libelle_file == '') {
            this._notificationService.openSnackBarSimpleError("Le libellé du fichier est obligatoire");
            return
        }

        if (this.file_url == undefined) {
            this._notificationService.openSnackBarSimpleError("Le fichier du dossier est obligatoire");
            return
        }

        const formData: FormData = new FormData();

        formData.append("libelle_file", this.libelle_file);
        formData.append("dossiers_code", this.dossiers_code);
        formData.append("file_url", this.file_url != undefined ? this.file_url : "");


        this.is_loading = true;



        this._traitement.saveDossiersFile(formData).subscribe({

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


    updateDossiersFile() {

        if (this.libelle_file == '') {
            this._notificationService.openSnackBarSimpleError("Le libellé du fichier est obligatoire");
            return
        }



        const formData: FormData = new FormData();

        formData.append("libelle_file", this.libelle_file);
        formData.append("dossiers_code", this.dossiers_code);
        formData.append("file_url", this.file_url != undefined ? this.file_url : "");

        this.is_loading = true;

        this._traitement.updateDossiersFile(formData, this.item_slug).subscribe({

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
