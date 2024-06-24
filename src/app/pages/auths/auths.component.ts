import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieManagerService } from '../../services/data-managers/cookies/cookie-manager.service';
import { StorageManagerService } from '../../services/data-managers/storage/storage-manager.service';
import { NotificationService } from '../../services/notifications/notification.service';
import packageJson from '../../../../package.json';
import { CheckAuthorisationComponent } from '../../components/actions/check-authorisation/check-authorisation.component';
import { ForgetPasswordComponent } from '../../dialogs/users/forget-password/forget-password.component';
import { RecaptchaModule } from "ng-recaptcha";
import { CreateEmployeesFormsDialogComponent } from '../../dialogs/employees-forms/create-employees-forms-dialog/create-employees-forms-dialog.component';

@Component({
    selector: 'app-auths',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RecaptchaModule
    ],
    templateUrl: './auths.component.html',
    styleUrl: './auths.component.css',
})
export class AuthsComponent implements OnInit {

    // var recaptcha
    public siteKey: string = '6Ld8h_EpAAAAAKWBWbjf8YhC4qwNKjB07Z5pSuK5';
    public token: string = '6Ld8h_EpAAAAANeGK8bUmFVVjkd1DgpaoW9i918N';


    public hide: boolean = true;
    public new_date: Date = new Date();

    public is_loading: boolean = false;

    public code_autorisation: string = '';
    public code_owners: string = '';
    //Login attribute
    public email: string = '';
    public password: string = '';

    //variable to check app version
    public version: string = '';

    public recaptcha_response: any = null;

    constructor(

        //private _loadings: LoadingService,
        //private _traitement: TraitementsService,

        private _authService: AuthService,
        private _router: Router,
        private _dialog: MatDialog,
        private _cookieService: CookieManagerService,
        private _storageService: StorageManagerService,
        private _notificationService: NotificationService,
    ) { }

    ngOnInit(): void {

        this.version = packageJson.version
    }
    //ARIH59AT
    connectAdmin() {

        const data = {
            email: this.email,
            password: this.password
        }

        //console.log(data);
        this.is_loading = true;

        this._authService.connectAdmin(data).subscribe({

            next: (response: any) => {

                //return
                if (response.code == 200) {

                    setTimeout(() => {

                        this._cookieService.setTokenToCookie(response.token);

                        this._cookieService.setEmailToCookie(response.users.accounts_info.email);

                        this._storageService.setTokenToStorage(response.token);

                        this._storageService.setDataToStorage(response.users.accounts_info);
                        this._storageService.setIsLoggedToStorage('true')

                        this.is_loading = false;


                        this._notificationService.openSnackBarSuccess(response);


                        this.redirectTo(response.users.accounts_info.type_accounts)

                    }, 1000)
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {
                    this._notificationService.openSnackBarError(response);
                    this.is_loading = false;
                }

            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    //window.location.reload();
                }
            }
        });

    }



    // REDIRECT AFTER LOGGED
    redirectTo(keywork: string)
    {
        //keyword: administration; ressource_humaine ; gestion_stock ; gestion_courier ; employe; secretariat


        if(keywork == "administration"){
            this._router.navigate(['/admin'])
        }

        if(keywork == "ressource_humaine"){
            this._router.navigate(['/capital-humain'])
        }

        if(keywork == "gestion_stock"){
            this._router.navigate(['/stock-manager'])
        }

        if(keywork == "gestion_courier"){
            this._router.navigate(['/courrier-manager'])
        }

        if(keywork == "employe"){
            this._router.navigate(['/employees'])
        }

        if(keywork == "secretariat"){
            this._router.navigate(['/courrier-register'])
        }
    }

    openCheckAuthorizationDialog(enterAnimationDuration: string, exitAnimationDuration: string)
    {
        const dialogRef = this._dialog.open(CheckAuthorisationComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                //console.log(val)
                if (val.code_authorization_data.code) {
                    this.openCreateEmployeeFormsDialog(val.code_authorization_data.code, val.code_authorization_data.owners)
                }else{
                    //this.isCreatedEmployeeAccountStarted = false;
                }
            },
        });
    }


    openCreateEmployeeFormsDialog(code_autorisation: string, code_owners: string) {

        const data = {
            code_autorisation: code_autorisation,
            code_owners: code_owners,
            action: "create_on_frontend"
        }
        const dialogRef = this._dialog.open(CreateEmployeesFormsDialogComponent, {
            panelClass: 'fullscreen-dialog',

            data: data
        });

        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this._dialog.closeAll();
                }
            },
        });
    }
    openForgetPasswordDialog(enterAnimationDuration: string, exitAnimationDuration: string) {

        const dialogRef = this._dialog.open(ForgetPasswordComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }



    resolved(captchaResponse: any) {
        this.recaptcha_response = captchaResponse;
    }
}
