import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-notify-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
    ],
    templateUrl: './notify-dialog.component.html',
    styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent implements OnInit {

    public notification_data: string = '';
    public adresse_email: string = '';

    public employe_matricule: string = '';
    public item_slug: string = '';
    public keyword: string = '';
    public keywords: string = '';

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<NotifyDialogComponent>,
        private _userData: UserDataManagerService,
    ){}

    ngOnInit(): void {

        if (this.data != null) {

            this.adresse_email = this.data.adresse_email;
            this.employe_matricule = this.data.employe_matricule;
            this.item_slug = this.data.item_slug;
            this.keyword = this.data.word
            this.keywords = this.data.keywords


        }
    }



    sendNotification(){


        if(this.notification_data == ''){
            this._notificationService.openSnackBarSimpleError("Le commentaire est obligatoire");
            return
        }

        const data = {
            adresse_mail: this.adresse_email,
            keyword: this.keyword,
            keywords: this.keywords,
            notification_data: this.notification_data,
            slug: this.item_slug,
            employe_matricule: this.employe_matricule
        }

        this._loadings.show_loading();

        this._traitement.sendNotification(data).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loadings.hide_loading();
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loadings.hide_loading();
                    this._notificationService.openSnackBarError(response);
                }
            },
        })
    }
}
