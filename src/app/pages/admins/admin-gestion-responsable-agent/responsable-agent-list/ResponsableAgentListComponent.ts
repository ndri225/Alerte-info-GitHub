import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { UpdateActionComponent } from '../../../../components/actions/update-action/update-action.component';


@Component({
    selector: 'app-responsable-agent-list',
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
    templateUrl: './responsable-agent-list.component.html',
    styleUrl: './responsable-agent-list.component.css',
})
export class ResponsableAgentListComponent implements OnInit {

    public list_responsable: any = [];
    public list_agents: any = [];
    public list_employees: any = [];
    public p: number = 1;
    public total_responsable: number = 0;
    public total_agents: number = 0;

    public selectedResponsableOption: any;
    public employee_matricule: string = '';
    public is_checked: boolean = false;
    public is_selected: boolean = false;
    public is_choose: string = '';
    public item_slug: string = '';
    public _loadings: boolean = false;
    public is_updated: boolean = false;

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.getEmployeeWhereIsresponsibleAndIsAgentEqualZeroList();
        this.getResponsableAgentsList();
    }


    selectResponsableAgents(event: any) {
        this.employee_matricule = event.value;

        this.is_selected = true;
    }

    radioChange(event: any) {

        this.is_choose = event.value;
        this.is_checked = true;
    }

    updateResponsableOrAgents(data: any) {

        if (data.is_responsible == 1 || data.is_qgents == 1) {

            const dialog = this._dialog.open(UpdateActionComponent, {
                width: 'auto',
            });
            dialog.afterClosed().subscribe({
                next: (val) => {
                    if (val == "confirm") {
                        this.getResponsableAgentsList();
                    }
                },
            });
        } else {
            this.getEmployeeWhereIsresponsibleAndIsAgentEqualZeroList();
            this.item_slug = data.slug;
            this.selectedResponsableOption = data.employee_matricule;
            this.is_choose = data.type_responsable_agent;
            this.is_selected = true;
            this.is_checked = true;
            this.is_updated = true;
        }


    }

    getEmployeeWhereIsresponsibleAndIsAgentEqualZeroList() {

        this._loading.show_loading();
        this._traitement.getEmployeeWhereIsresponsibleAndIsAgentEqualZero().subscribe({
            next: (response: any) => {
                console.log(response)
                setTimeout(() => {
                    this.list_employees = response;
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


    saveResponsableAgents() {
        const data = {
            employee_matricule: this.employee_matricule,
            type_responsable_agent: this.is_choose
        };

        this._loadings = true;

        this._traitement.saveResponsableAgents(data).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loadings = false;
                        this.initForm();
                        this.getResponsableAgentsList();
                        this.getEmployeeWhereIsresponsibleAndIsAgentEqualZeroList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loadings = false;
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }


    updateResponsableAgents() {
        const data = {
            employee_matricule: this.employee_matricule == '' ? this.selectedResponsableOption : this.employee_matricule,
            type_responsable_agent: this.is_choose
        };

        this._loadings = true;

        this._traitement.updateResponsableAgents(data, this.item_slug).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loadings = false;
                        this.initForm();
                        this.getResponsableAgentsList();
                        this.getEmployeeWhereIsresponsibleAndIsAgentEqualZeroList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loadings = false;
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }


    getResponsableAgentsList() {

        this._loading.show_loading();
        this._traitement.getResponsableAgents().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    // responsable service
                    this.list_responsable = response.responsable_list;
                    this.total_responsable = this.list_responsable.length;


                    // Agents service
                    


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


    enableOrDisableIsResponsible(employee_matricule: string) {

        this._loading.show_loading();

        this._traitement.enableOrDisableIsResponsible(employee_matricule).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loading.hide_loading();

                        this.getResponsableAgentsList();
                        //console.log(this.status_info);
                    }, 500);
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



    enableOrDisableIsAgents(employee_matricule: string) {

        this._loading.show_loading();

        this._traitement.enableOrDisableIsAgents(employee_matricule).subscribe({
            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loading.hide_loading();
                        this.getResponsableAgentsList();

                    }, 500);
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

    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteResponsableAgents(slug);

                }
            },
        });
    }


    deleteResponsableAgents(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyResponsableAgents(slug).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loading.hide_loading();
                        this.getResponsableAgentsList();
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


    initForm() {
        this.selectedResponsableOption = '';
        this.is_choose = '';
        this.is_selected = false;
        this.is_checked = false;
        this.is_updated = false;
    }
}
