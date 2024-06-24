import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PermissionService } from '../../../../services/treatments/permissions/permission.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
    selector: 'app-ch-edit-permissions',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        NgxMatTimepickerModule,
        FormsModule,
        TransformDatePipe,
        TransformTextPipe,
        RouterModule,
    ],
    templateUrl: './ch-edit-permissions.component.html',
    styleUrl: './ch-edit-permissions.component.css',
})
export class ChEditPermissionsComponent implements OnInit {

    public user_name: string = '';
    public user_fonction: string = '';
    public user_service: string = '';
    public user_id: any;

    public motif: string = '';

    public assigment_file!: File;
    public old_assignment_file: any = '';
    public is_choose: string = '';

    public dead_line_assigment: any ;


    public old_date: string = '';

    public selectedDureeOption: string = '';


    public duration_is_hour: boolean = false
    public hour_start: any ;
    public hour_end: any ;

    public date_permission: Date = new Date();

    public duration_is_date: boolean = false;
    public date_start: any;
    public old_date_stard: Date = new Date();
    public date_end: Date = new Date();
    public old_date_end: any;

    public permission_ref: string = '';
    public type_duration: string = '';

    public fonction: string = '';
    public service: string = '';

    public permission_start: string = '';
    public permission_end: string = '';
    public duree_permission: string = '';



    constructor(
        private _dialog: MatDialog,
        private _permission: PermissionService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _userData: UserDataManagerService
    ){}



    ngOnInit(): void {

    }



    PermissionDurationChange(event: any)
    {
        let res = event.value;

        if(res == 'hour'){
            this.duration_is_hour = true;
            this.duration_is_date = false;
            this.type_duration = res;
        }else if(res == 'date'){
            this.duration_is_date = true;
            this.duration_is_hour = false;
            this.type_duration = res;
        }else{
            this.duration_is_date = false;
            this.duration_is_hour = false;
        }
    }

    checkedPermissionDurationChange(type_duration: string)
    {
        if(type_duration == 'hour'){
            this.duration_is_hour = true;
            this.duration_is_date = false;
            this.type_duration = this.type_duration;
        }else if(type_duration == 'date'){
            this.duration_is_date = true;
            this.duration_is_hour = false;
            this.type_duration = this.type_duration;
        }else{
            this.duration_is_date = false;
            this.duration_is_hour = false;
        }
    }


    getCurrentPermissionInfo()
    {
        let slug: any = this._activatedRoute.snapshot.paramMap.get('slug');

        this._permission.editDemandePermission(slug).subscribe({

            next: (response: any) => {

                //console.log(response)

                this.user_name = response.customer_name;
                this.user_fonction = response.fonction;
                this.user_service = response.service;
                this.motif = response.motif;
                this.date_permission = new Date(response.date_permission);
                this.old_assignment_file = response.permission_file;
                this.user_id = response.customer_id;

                this.permission_ref = response.permission_ref;
                this.fonction = response.fonction;
                this.service = response.service;

                this.duree_permission = response.duree_permission;
                this.motif = response.motif;
                this.type_duration = response.type_duration;

                if(this.type_duration == 'hour'){
                    this.hour_start = response.permission_start;
                    this.hour_end = response.permission_end;
                }

                if(this.type_duration == 'date'){
                    this.date_start = new Date(response.permission_start);
                    this.date_end = new Date(response.permission_end);
                }

                this.checkedPermissionDurationChange(this.type_duration);
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

    updatePermission() {

        //console.log(this.dead_line_assigment);
        //return
        this._loading.show_loading();

        let slug: any = this._activatedRoute.snapshot.paramMap.get('slug');


        let duree_heure = this.calculateDifferenceBetweenTwoHours(this.hour_start, this.hour_end);
        let duree_jour = this.calculateDifferenceBetweenDates(this.date_start, this.date_end);

        console.log(duree_heure, duree_jour);
        //return;
        const formData: FormData = new FormData();
        formData.append("customer_name", this.user_name);
        formData.append("fonction", this.user_fonction);
        formData.append("service", this.user_service);
        formData.append("customer_id", this.user_id);
        formData.append("type_duration", this.type_duration);
        formData.append("date_permission", this.formatDate(this.date_permission).toString());


        if(duree_heure == undefined)
        {formData.append("duree_permission", duree_jour);}
        else
        {formData.append("duree_permission", duree_heure);}

        if (duree_heure == undefined) {
            formData.append("permission_end", this.formatDate(this.date_end).toString());
            formData.append("permission_start", this.formatDate(this.date_start).toString());

        } else if (duree_jour == undefined) {
            formData.append("permission_end", this.hour_end);
            formData.append("permission_start", this.hour_start);
        }

        formData.append("motif", this.motif);
        formData.append("permission_file", this.assigment_file == undefined ? "" : this.assigment_file);

        this._permission.updateDemandePermission(slug,formData).subscribe({

            next: (response: any) => {
                console.log(response);
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this._loading.hide_loading();
                        this._router.navigateByUrl('/ch.permissions');
                    }, 2000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
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


        })
    }

    uploadFile(e: any) {
        this.assigment_file = e.target.files[0];
    }

    radioChange(event: any) {this.is_choose = event.value;}

    onChange_dead_line_assigment(event: any) {
        this.dead_line_assigment = event.value
    }

    formatDate(date: any) {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;

    }




    changeFile(){
        this.old_assignment_file = null;
    }


    // CALCULATE HOUR DURATION

    calculateDifferenceBetweenTwoHours(heure1: any, heure2: any) {

        if(heure1 != undefined && heure2 != undefined){
            let [heure1Heures, heure1Minutes] = heure1.split(':').map(Number);
            let [heure2Heures, heure2Minutes] = heure2.split(':').map(Number);

            // Calculer la différence en minutes
            let differenceEnMinutes = (heure2Heures * 60 + heure2Minutes) - (heure1Heures * 60 + heure1Minutes);

            // Calculer les heures et les minutes finales
            let heures = Math.floor(differenceEnMinutes / 60);
            let minutes = differenceEnMinutes % 60;

            return heures+'h'+ (minutes == 0?'00':minutes) ;
        }else {
            return undefined;
        }
        // Convertir les heures en minutes
    }

    // CALCULATE DATE DURATION
    calculateDifferenceBetweenDates(date1: any, date2: any): any {

        if(date1 != undefined && date2 != undefined) {
            let differenceEnMilliseconds = Math.abs(date2.getTime() - date1.getTime());
            let differenceEnJours = differenceEnMilliseconds / (1000 * 3600 * 24);

            return differenceEnJours + 'Jour(s)';
        } else {
            return undefined;
        }
    }
}
