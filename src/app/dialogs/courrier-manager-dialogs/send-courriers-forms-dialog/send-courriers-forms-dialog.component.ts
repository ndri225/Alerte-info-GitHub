import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material-module';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-send-courriers-forms-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './send-courriers-forms-dialog.component.html',
    styleUrl: './send-courriers-forms-dialog.component.css',
})
export class SendCourriersFormsDialogComponent implements OnInit {

    public adress_email_expediteur: string = '';
    public adress_email_destinataire: string = '';
    public destinataire: string = '';
    public telephone_destinataire: string = '';
    public designation_destinataire: string = '';
    public objet_courrier: string = '';
    public retour_courrier: string = '';
    public date_reception: Date = new Date();

    public is_update: boolean = false;
    public is_loading: boolean = false;
    public item_slug: string = '';
    public action_data: string = '';
    public decision_data: string = '';
    public document_courriers!: File;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<SendCourriersFormsDialogComponent>,
    ){}

    ngOnInit(): void {

        if(this.data != undefined)
        {

            if(this.data.action == "send_in"){
                this.action_data = this.data.action;
            }else if(this.data.action == "send_out"){
                this.action_data = this.data.action;
            }else if(this.data.action == "updated"){
                this.adress_email_destinataire = this.data.data.adress_email_destinataire;
                this.destinataire = this.data.data.destinataire;
                this.telephone_destinataire = this.data.data.telephone_destinataire;
                this.designation_destinataire = this.data.data.designation_destinataire;
                this.objet_courrier = this.data.data.objet_courrier;
                this.retour_courrier = this.data.data.retour_courrier;
                this.date_reception = new Date(this.data.data.date_reception);
                this.decision_data = this.data.data.decision_data;
                this.action_data = this.data.data.type_send;
                this.item_slug = this.data.data.slug;
                this.is_update = true;
            }else {
                console.log("Nothing")
            }
        }
    }


    DecisionChange(event: any) {
        this.decision_data = event.value;
    }
    uploadFile(e: any) {
        this.document_courriers = e.target.files[0];
    }


    saveCourrier()
    {


        if (this.adress_email_destinataire == '') {
            this._notificationService.openSnackBarSimpleError("L'Adresse email du destinataire est obligatoire");
            return
        }

        if (this.destinataire == '') {
            this._notificationService.openSnackBarSimpleError("Le destinataire est obligatoire");
            return
        }
        if (this.telephone_destinataire == '') {
            this._notificationService.openSnackBarSimpleError("Le téléphone du destinataire est obligatoire");
            return
        }

        if (this.objet_courrier == '') {
            this._notificationService.openSnackBarSimpleError("L'objet du courrier est obligatoire");
            return
        }

        if (this.action_data == 'send_out' && this.retour_courrier == '') {
            this._notificationService.openSnackBarSimpleError("Le retour du courrier est obligatoire");
            return
        }

        const formData: FormData = new FormData();

        formData.append("retour_courrier", this.retour_courrier);
        formData.append("type_send", this.action_data);
        formData.append("date_reception", this.formatDate(this.date_reception));
        formData.append("adress_email_destinataire", this.adress_email_destinataire);
        formData.append("destinataire", this.destinataire);
        formData.append("telephone_destinataire", this.telephone_destinataire);
        formData.append("designation_destinataire", this.designation_destinataire);
        formData.append("objet_courrier", this.objet_courrier);
        formData.append("decision_data", this.decision_data);
        formData.append("document_courriers_send", this.document_courriers != undefined ? this.document_courriers : "");


        this.is_loading = true;

        this._traitement.saveSendCourrier(formData).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
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
        })
    }

    updateCourrier()
    {
        if (this.adress_email_destinataire == '') {
            this._notificationService.openSnackBarSimpleError("L'Adresse email du destinataire est obligatoire");
            return
        }

        if (this.destinataire == '') {
            this._notificationService.openSnackBarSimpleError("Le destinataire est obligatoire");
            return
        }
        if (this.telephone_destinataire == '') {
            this._notificationService.openSnackBarSimpleError("Le téléphone du destinataire est obligatoire");
            return
        }
        if (this.action_data == 'send_out' && this.retour_courrier == '') {
            this._notificationService.openSnackBarSimpleError("Le retour du courrier est obligatoire");
            return
        }

        const formData: FormData = new FormData();

        formData.append("retour_courrier", this.retour_courrier);
        formData.append("type_send", this.action_data);
        formData.append("date_reception", this.formatDate(this.date_reception));
        formData.append("adress_email_destinataire", this.adress_email_destinataire);
        formData.append("destinataire", this.destinataire);
        formData.append("telephone_destinataire", this.telephone_destinataire);
        formData.append("designation_destinataire", this.designation_destinataire);
        formData.append("objet_courrier", this.objet_courrier);
        formData.append("decision_data", this.decision_data);
        formData.append("document_courriers_send", this.document_courriers == undefined ? "" :this.document_courriers );

        this.is_loading = true;

        this._traitement.updateSendCourrier(formData, this.item_slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
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
        })
    }
    // FORMAT DATE FUNCTION

    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }
}
