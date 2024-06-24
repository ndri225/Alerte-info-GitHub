import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { AddBureauComponent } from '../../../../dialogs/admin-dialogs/add-bureau/add-bureau.component';

@Component({
    selector: 'app-bureau-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule,
    ],
    templateUrl: './bureau-list.component.html',
    styleUrl: './bureau-list.component.css',
})
export class BureauListComponent implements OnInit {

    public list_bureau: any = [];
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getBureauList();
    }

    openBureauDialog() {
        const dialogRef = this._dialog.open(AddBureauComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getBureauList();
                }
            },
        });
    }


    updateBureau(data: any) {


        const dialogRef = this._dialog.open(AddBureauComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getBureauList();
                }
            },
        });

    }




    getBureauList() {

        this._loading.show_loading();
        this._traitement.getBureau().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_bureau = response
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

                    this.deleteBureau(slug)

                }
            },
        });
    }


    deleteBureau(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyBureau(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getBureauList();
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
