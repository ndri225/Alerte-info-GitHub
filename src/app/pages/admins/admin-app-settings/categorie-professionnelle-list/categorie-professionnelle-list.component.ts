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
import { AddCategorieProComponent } from '../../../../dialogs/admin-dialogs/add-categorie-pro/add-categorie-pro.component';

@Component({
    selector: 'app-categorie-professionnelle-list',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule,
    ],
    templateUrl: './categorie-professionnelle-list.component.html',
    styleUrl: './categorie-professionnelle-list.component.css',
})
export class CategorieProfessionnelleListComponent implements OnInit {

    public list_categorie_pro: any = [];
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getCategorieProfessionnelleList();
    }

    openCategorieProfessionnelleDialog() {
        const dialogRef = this._dialog.open(AddCategorieProComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCategorieProfessionnelleList();
                }
            },
        });
    }


    updateCategorieProfessionnelle(data: any) {


        const dialogRef = this._dialog.open(AddCategorieProComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCategorieProfessionnelleList();
                }
            },
        });

    }




    getCategorieProfessionnelleList() {

        this._loading.show_loading();
        this._traitement.getCategorieProfessionnelle().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_categorie_pro = response
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

                    this.deleteCategorieProfessionnelle(slug)

                }
            },
        });
    }


    deleteCategorieProfessionnelle(slug: string) {
        this._loading.show_loading();

        this._traitement.deleteCategorieProfessionnelle(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getCategorieProfessionnelleList();
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
