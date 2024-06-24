import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { UserRoleDialogComponent } from '../../../../dialogs/users/user-role-dialog/user-role-dialog.component';

@Component({
    selector: 'app-user-role-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule
    ],
    templateUrl: './user-role-list.component.html',
    styleUrl: './user-role-list.component.css',
})
export class UserRoleListComponent implements OnInit {


    public list_role: any = [];
    public p: number = 1;

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ){}


    ngOnInit(): void {
        this.getRoleList();
    }

    openRoleDialog() {
        const dialogRef = this._dialog.open(UserRoleDialogComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getRoleList();
                }
            },
        });
    }


    updateRole(data: any) {


        const dialogRef = this._dialog.open(UserRoleDialogComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getRoleList();
                }
            },
        });

    }




    getRoleList() {

        this._loading.show_loading();
        this._traitement.getRoles().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_role = response
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

                    this.deleteRole(slug)

                }
            },
        });
    }


    deleteRole(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyRole(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.getRoleList();
                        this._loading.hide_loading();
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
