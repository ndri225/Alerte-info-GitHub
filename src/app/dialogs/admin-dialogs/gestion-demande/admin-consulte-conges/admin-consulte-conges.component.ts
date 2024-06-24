import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { CongeService } from '../../../../services/treatments/conges/conge.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MaterialModule } from '../../../../material-module';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { FormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-admin-consulte-conges',
    templateUrl: './admin-consulte-conges.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        TransformDatePipe,
        FormsModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
    styleUrls: ['./admin-consulte-conges.component.css'],
})
export class AdminConsulteCongesComponent implements OnInit {
    public item_slug: any = '';

    public conge_data: any;
    public conge_ref: string = '';
    public type_duration: string = '';
    public date_permission: string = '';
    public motif: string = '';
    public fonction: string = '';
    public service: string = '';
    public objet_demande: string = '';
    public created_at: string = '';
    public status_on: number = 0;
    public status_off: number = 0;
    public conge_start: string = '';
    public conge_end: string = '';
    public duree_conge: string = '';
    public customer_name: string = '';
    public justificatif: string = '';

    public show_comment_box: boolean = false;
    public decision: string = '';
    public decision_comments: string = '';
    public comments: string = '';

    public loading: boolean = false;

    constructor(
        private _conge: CongeService,
        private _notificationService: NotificationService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AdminConsulteCongesComponent>
    ) {
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.item_slug = this.data.slug;
        }

        this.getCurrentCongeInfo();

        this.updateIsConsultingStatus();
    }

    getCurrentCongeInfo() {
        this._conge.showConge(this.item_slug).subscribe({
            next: (response: any) => {
                //console.log(response);
                // INFORMATION PERSONNELLE
                this.conge_data = response;
                this.conge_ref = response.conge_ref;
                this.fonction = response.fonction;
                this.justificatif = response.conge_file;
                this.service = response.service;
                this.conge_start = response.date_depart;
                this.conge_end = response.date_retour;
                this.duree_conge = response.duree_conge;
                this.customer_name =
                    response.first_name + ' ' + response.last_name;
                this.motif = response.motif;
                this.created_at = response.created_at;
                this.objet_demande = response.objet_demande;
                this.status_on = response.status_on;
                this.status_off = response.status_off;
                this.comments = response.comments;
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

    congeDecisionChange(event: any) {
        let event_data = event.value;

        if (event_data == 'approved') {
            this.show_comment_box = true;
            this.decision = event_data;
        } else if (event_data == 'rejected') {
            this.show_comment_box = true;
            this.decision = event_data;
        } else {
            this.show_comment_box = false;
            this.decision = '';
        }
    }

    saveDecision() {
        const data = {
            decison: this.decision,
            decision_comments: this.decision_comments,
            slug: this.item_slug,
        };

        //console.log(data);
        this.loading = true;

        this._conge.approvedOrRejectedConge(data).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;
                        this.getCurrentCongeInfo();

                        this.show_comment_box = false;
                        //this._router.navigateByUrl('/web.apps.rh.permissions');
                    }, 1000);
                } else if (
                    response.code == 300 ||
                    response.code == 500 ||
                    response.code == 302
                ) {
                    this.loading;
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

    updateIsConsultingStatus() {
        this._conge.updateIsConsultingStatus(this.item_slug).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                } else if (
                    response.code == 300 ||
                    response.code == 500 ||
                    response.code == 302
                ) {
                    this.loading;
                    this._notificationService.openSnackBarError(response);
                } else if (response.code == 201) {
                    this.loading;
                    this._notificationService.openSnackBarInfo(response);
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

    printConge() {
        var printContents: any =
            document.querySelector('#conge_card')?.innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        //window.open(originalContents, '_blank');
        window.print();
        document.body.innerHTML = originalContents;
        location.reload();
    }
}
