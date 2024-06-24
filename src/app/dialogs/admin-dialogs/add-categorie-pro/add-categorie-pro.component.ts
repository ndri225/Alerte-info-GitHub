import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MaterialModule } from '../../../material-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';

@Component({
    selector: 'app-add-categorie-pro',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './add-categorie-pro.component.html',
    styleUrls: ['./add-categorie-pro.component.css'],
})
export class AddCategorieProComponent implements OnInit {
    public categorie_pro: string = '';
    public is_update: boolean = false;
    public item_slug: any;

    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCategorieProComponent>
    ) {}

    ngOnInit() {
        if (this.data != null) {
            this.is_update = true;
            this.categorie_pro = this.data.categorie_pro;
            this.item_slug = this.data.slug;
        }
    }

    saveCategoriePro() {
        if (this.categorie_pro == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le catégorie professionnelle est obligatoire'
            );
            return;
        }

        const data = {
            categorie_pro: this.categorie_pro.toUpperCase(),
        };

        this.is_loading = true;

        this._traitement.saveCategorieProfessionnelle(data).subscribe({
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
            },
        });
    }

    updateCategoriePro() {
        if (this.categorie_pro == '') {
            this._notificationService.openSnackBarSimpleError(
                'La catégorie professionnelle est obligatoire'
            );
            return;
        }

        const data = {
            categorie_pro: this.categorie_pro.toUpperCase(),
        };

        this.is_loading = true;

        this._traitement
            .updateCategorieProfessionnelle(data, this.item_slug)
            .subscribe({
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
                },
            });
    }
}
