import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';

@Component({
    selector: 'app-create-users',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './create-users.component.html',
    styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent implements OnInit {
    public first_name: string = '';
    public last_name: string = '';
    public email: string = '';
    public fonction: any;
    public service: any;
    public type_accounts: any;

    public password: string = '';
    public role: any;
    public hide: boolean = true;
    public is_update: boolean = false;
    public item_slug: any;
    public old_image: string = '';
    public img_update: boolean = true;
    public user_image!: File;

    public selectedOption: any;
    public selectedFonctionOption: any;
    public selectedServiceOption: any;
    public selectedTypeAccountsOption: any;

    public confirm_password: string = '';
    public list_roles: any = [];
    public list_fonction: any = [];
    public list_service: any = [];

    public list_type_accounts: any = [
        {
            id: 1,
            type: 'Administration',
            type_accounts: 'administration',
        },
    ];
    public phone: string = '';

    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CreateUsersComponent>
    ) {}

    ngOnInit() {
        if (this.data != null) {
            this.is_update = true;
            this.img_update = false;
            this.first_name = this.data.first_name;
            this.last_name = this.data.last_name;
            this.email = this.data.email;
            this.phone = this.data.mobile;
            this.old_image = this.data.photo;
            this.item_slug = this.data.slug;
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

    getRole() {
        this._traitement.getRoles().subscribe({
            next: (response: any) => {
                this.list_roles = response;
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

    uploadFile(e: any) {
        this.user_image = e.target.files[0];
    }

    saveUsers() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le nom est obligatoire'
            );
            return;
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le prénom est obligatoire'
            );
            return;
        }

        if (this.email == '') {
            this._notificationService.openSnackBarSimpleError(
                "L'adresse email est obligatoire"
            );
            return;
        }

        const formData: FormData = new FormData();
        formData.append('first_name', this.first_name);
        formData.append('last_name', this.last_name);
        formData.append('email', this.email);
        formData.append('role', this.role);
        formData.append(
            'type_accounts',
            this.type_accounts != undefined
                ? this.selectedTypeAccountsOption
                : this.type_accounts
        );
        formData.append(
            'admin_photo',
            this.user_image != undefined ? this.user_image : ''
        );

        this.is_loading = true;

        this._traitement.saveUsers(formData).subscribe({
            next: (response: any) => {
                //.log(response)
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

    updateUsers() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le nom est obligatoire'
            );
            return;
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le prénom est obligatoire'
            );
            return;
        }

        if (this.email == '') {
            this._notificationService.openSnackBarSimpleError(
                "L'adresse email est obligatoire"
            );
            return;
        }

        const formData: FormData = new FormData();
        formData.append('first_name', this.first_name);
        formData.append('last_name', this.last_name);
        formData.append('email', this.email);
        formData.append(
            'role',
            this.role == undefined ? this.selectedOption : this.role
        );
        formData.append(
            'type_accounts',
            this.type_accounts == undefined
                ? this.selectedTypeAccountsOption
                : this.type_accounts
        );
        formData.append(
            'admin_photo',
            this.user_image == undefined ? '' : this.user_image
        );

        this.is_loading = true;

        this._traitement.updateUsers(formData, this.item_slug).subscribe({
            next: (response: any) => {
                console.log(response);
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
