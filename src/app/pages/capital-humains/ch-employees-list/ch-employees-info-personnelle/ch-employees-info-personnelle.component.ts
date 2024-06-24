import { Component, OnInit } from '@angular/core';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-ch-employees-info-personnelle',
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
    templateUrl: './ch-employees-info-personnelle.component.html',
    styleUrl: './ch-employees-info-personnelle.component.css',
})
export class ChEmployeesInfoPersonnelleComponent implements OnInit {

    public list_employe_infos: any = [];
    public p: number = 1;


    constructor(
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router,
        private _dialog: MatDialog,
    ) { }



    ngOnInit(): void {
        this.getEmployesInfoList();
    }

    showEmploye(slug: string){

        this._router.navigate(['/ch.detail.employes', slug]);
    }

    getEmployesInfoList() {

        this._loading.show_loading();
        this._traitement.getEmployeInfoWithStatusZero().subscribe({

            next: (response: any) => {
                console.log(response);
                setTimeout(() => {
                    this.list_employe_infos = response
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

                    this.deleteEmploye(slug)

                }
            },
        });
    }


    deleteEmploye(slug: string) {
        this._loading.show_loading();

        this._traitement.deleteEmployes(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getEmployesInfoList();
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
