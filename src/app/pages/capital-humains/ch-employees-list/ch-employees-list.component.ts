import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { EmployeesAccountsComponent } from '../../../dialogs/users/employees-accounts/employees-accounts.component';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';

@Component({
    selector: 'app-ch-employees-list',
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
    templateUrl: './ch-employees-list.component.html',
    styleUrl: './ch-employees-list.component.css',
})
export class ChEmployeesListComponent implements OnInit {

    public list_employes: any = [];
    public list_service: any = [];
    public p: number = 1;

    public date_start: any;
    public date_end: any;
    public service: any;
    public search: any;

    public status_list: any = [
        {id: 1, status: "Responsable de service", abrev: "RS"},
        {id: 2, status: "Agent de service", abrev: "AS"}
    ];

    public status:  string = '';

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loading.show_loading();
        setTimeout(() => {

            this.getEmployeesList();

            this.getServiceList();
            this._loading.hide_loading();
        }, 1000);
    }

    searchInTable() {

        this._loading.show_loading();
        this._traitement.filterByQuery(this.search).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_employes = response
                    this._loading.hide_loading();
                }, 500);
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

    getServiceList()
    {
        this._traitement.getService().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_service = response
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

    selectService(event: any) {
        this.service = event.value;
        //console.log(this.service)
        this._loading.show_loading();
        this._traitement.filterByService(this.service).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_employes = response
                    //console.log(this.list_employes)
                    this._loading.hide_loading();
                }, 500);
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



    getEmployeesList() {


        this._traitement.getEmployes().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_employes = response
                }, 700);
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

    openEmployeAccountDialog(data: any) {
        const dialog = this._dialog.open(EmployeesAccountsComponent, {
            width: 'auto',
            data: data
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                this.getEmployeesList();
            },
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
                        this.getEmployeesList();
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

    showEmploye(slug: string){

        this._router.navigate(['/ch.detail.employes', slug]);
    }
}
