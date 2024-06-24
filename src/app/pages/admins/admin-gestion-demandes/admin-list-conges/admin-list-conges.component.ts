import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CongeService } from '../../../../services/treatments/conges/conge.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { AdminConsulteCongesComponent } from '../../../../dialogs/admin-dialogs/gestion-demande/admin-consulte-conges/admin-consulte-conges.component';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-admin-list-conges',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        TransformTextPipe,
        RouterModule
    ],
    templateUrl: './admin-list-conges.component.html',
    styleUrl: './admin-list-conges.component.css',
})
export class AdminListCongesComponent implements OnInit {

    public p: number = 1;

    public list_conges: any = [];
    public list_customer_conges: any = [];
    public conge_counter: number = 0;
    public customer_conge_counter: number = 0;
    public employe_matricule: string = "";


    constructor(
        private _dialog: MatDialog,
        private _conges: CongeService,
        private _loading: LoadingService,
        private _router: Router,
        private _userData: UserDataManagerService,
        private _notificationService: NotificationService,
    ){}


    ngOnInit(): void {
        this.getCongesList();
    }


    consulteConge(data: any) {
        const dialogRef = this._dialog.open(AdminConsulteCongesComponent,
            {
                panelClass: 'fullscreen-dialog',
                data: data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCongesList();
                }
            },
        });
    }

    getCongesList() {

        this._loading.show_loading();
        this._conges.getAllConge().subscribe({

            next: (response: any) => {
                setTimeout(() => {

                    this.list_customer_conges = response;
                    this.customer_conge_counter = this.list_customer_conges.length;

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

                    this.deleteConge(slug)

                }
            },
        });
    }


    deleteConge(slug: string) {
        this._loading.show_loading();

        this._conges.deleteDemandeConge(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getCongesList();
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
