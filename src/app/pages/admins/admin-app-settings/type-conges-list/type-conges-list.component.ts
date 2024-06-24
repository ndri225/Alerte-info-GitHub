import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { Router, RouterModule } from '@angular/router';
import { AddTypeCongeComponent } from '../../../../dialogs/admin-dialogs/add-type-conge/add-type-conge.component';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-type-conges-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule,
    ],
    templateUrl: './type-conges-list.component.html',
    styleUrl: './type-conges-list.component.css',
})
export class TypeCongesListComponent implements OnInit {

    public list_type_conge: any = [];
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getTypeCongeList();
    }

    openTypeCongeDialog() {
        const dialogRef = this._dialog.open(AddTypeCongeComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getTypeCongeList();
                }
            },
        });
    }


    updateTypeConge(data: any) {


        const dialogRef = this._dialog.open(AddTypeCongeComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getTypeCongeList();
                }
            },
        });

    }




    getTypeCongeList() {

        this._loading.show_loading();
        this._traitement.getTypeConge().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_type_conge = response
                    this._loading.hide_loading();
                }, 3000);
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

                    this.deleteTypeConge(slug)

                }
            },
        });
    }


    deleteTypeConge(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyTypeConge(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getTypeCongeList();
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
