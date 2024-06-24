import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-ch-employees-attendance-list',
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
    templateUrl: './ch-employees-attendance-list.component.html',
    styleUrl: './ch-employees-attendance-list.component.css',
})
export class ChEmployeesAttendanceListComponent implements OnInit {

    public list_pointage: any = [];
    public list_employe: any = [];
    public employe_matricule: string = '';

    public p: number = 1;

    public date_start: any;
    public date_end: any;

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {

        this.getPointageList();
        this.getEmployesList();
    }


    searchInAttendance()
    {}

    getEmployesList() {

        this._traitement.getEmployes().subscribe({

            next: (response: any) => {
                //console.log(response);
                setTimeout(() => {
                    this.list_employe = response
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

    onChangeEmployes(event: any)
    {
        this.employe_matricule = event.value;
    }






    getPointageList() {

        this._loading.show_loading();
        this._traitement.getPointage().subscribe({

            next: (response: any) => {
                //console.log(response);
                setTimeout(() => {
                    this.list_pointage = response
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

                    this.deletePointage(slug)

                }
            },
        });
    }


    deletePointage(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyPointage(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getPointageList();
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
