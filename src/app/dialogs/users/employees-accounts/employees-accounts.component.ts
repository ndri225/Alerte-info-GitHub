import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';

@Component({
    selector: 'app-employees-accounts',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './employees-accounts.component.html',
    styleUrls: ['./employees-accounts.component.css']
})
export class EmployeesAccountsComponent implements OnInit {


    public adress_email: string = '';
    public type_accounts: any;
    public employe_matricule: string = '';
    public first_name: string = '';
    public last_name: string = '';
    public role: any;

    public hide: boolean = true
    public is_update: boolean = false;
    public item_slug: any;
    public old_image: string = '';
    public img_update: boolean = true;
    public user_image!: File;

    public selectedOption: any;

    public selectedTypeAccountsOption: any;

    public list_roles: any = [];
    public is_loading: boolean = false;

    public list_type_accounts: any = [

        {
            id: 1,
            type: "Gestion Capital humain",
            type_accounts: "ressource_humaine"
        },
        {
            id: 2,
            type: "Gestion de stock",
            type_accounts: "gestion_stock"
        },
        {
            id: 3,
            type: "Employé",
            type_accounts: "employe"
        },
        {
            id: 4,
            type: "Gestion de courier",
            type_accounts: "gestion_courier"
        },
        {
            id: 4,
            type: "Sécrétariat",
            type_accounts: "secretariat"
        }
    ];
    public phone: string = '';

    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<EmployeesAccountsComponent>,
    ) { }


    ngOnInit() {
        if (this.data != null) {

            this.is_update = true;
            this.img_update = false;

            this.adress_email = this.data.adresse_email;

            this.old_image = this.data.photo;
            this.item_slug = this.data.slug;

            this.employe_matricule = this.data.matricule;
            this.selectedOption = this.data.role_id;
            this.selectedTypeAccountsOption = this.data.type_accounts;
        }

        this.getRole();
    }


    selectRole(event: any) {
        this.role = event.value;
    }

    selectTypeAccounts(event: any) {
        this.type_accounts = event.value;
    }


    isUpdateImg() {
        this.img_update = true;
    }


    getRole()
    {
        this._traitement.getRoles().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_roles = response
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

    uploadFile(e: any) {
        this.user_image = e.target.files[0];
    }

    saveUsers() {

        if (this.adress_email == '') {
            this._notificationService.openSnackBarSimpleError("L'adresse email est obligatoire");
            return
        }



        const data = {
            adress_email: this.adress_email,
            role: this.role == undefined ? this.selectedOption : this.role,
            employe_matricule: this.employe_matricule,
            type_accounts: this.type_accounts == undefined ? this.selectedTypeAccountsOption : this.type_accounts,

        }


        this.is_loading = true;

        this._traitement.createEmployeAccount(data).subscribe({

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
}
