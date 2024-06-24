import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { AddContratsComponent } from '../../../../dialogs/admin-dialogs/add-contrats/add-contrats.component';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-contrats-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule
    ],
    templateUrl: './contrats-list.component.html',
    styleUrl: './contrats-list.component.css',
})
export class ContratsListComponent implements OnInit {

    public list_contrats: any = [];
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getContratsList();
    }

    openContratsDialog() {
        const dialogRef = this._dialog.open(AddContratsComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getContratsList();
                }
            },
        });
    }


    updateContrats(data: any) {


        const dialogRef = this._dialog.open(AddContratsComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getContratsList();
                }
            },
        });

    }




    getContratsList() {

        this._loading.show_loading();
        this._traitement.getContrats().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_contrats = response
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

                    this.deleteContrats(slug)

                }
            },
        });
    }


    deleteContrats(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyContrats(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getContratsList();
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
