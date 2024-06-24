import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesFoldersDialogComponent } from '../../../dialogs/employees-dialogs/employees-folders-dialog/employees-folders-dialog.component';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-ch-employees-folder-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        TransformTextPipe,
        RouterModule,
    ],
    templateUrl: './ch-employees-folder-list.component.html',
    styleUrl: './ch-employees-folder-list.component.css',
})
export class ChEmployeesFolderListComponent implements OnInit {

    public list_dossiers: any = [];
    public p: number = 1;
    public dossiers_code: any;



    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {

        this.getDossiersList();
    }


    openDossiersDialog() {


        //console.log(this.dossiers_code);

        const dialogRef = this._dialog.open(EmployeesFoldersDialogComponent, {
            width: 'auto',

        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getDossiersList();
                }
            },
        });
    }


    updateDossiers(data: any) {


        const dialogRef = this._dialog.open(EmployeesFoldersDialogComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getDossiersList();
                }
            },
        });

    }




    getDossiersList() {

        this._loading.show_loading();
        this._traitement.getDossiers().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_dossiers = response
                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }


    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteDossiers(slug)

                }
            },
        });
    }


    deleteDossiers(slug: string) {
        this._loading.show_loading();

        this._traitement.deleteDossiers(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getDossiersList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loading.hide_loading();
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
        });

    }
}
