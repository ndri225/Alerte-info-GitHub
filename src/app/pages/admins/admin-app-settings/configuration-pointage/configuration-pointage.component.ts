import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
    selector: 'app-configuration-pointage',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule,
        NgxMatTimepickerModule
    ],
    templateUrl: './configuration-pointage.component.html',
    styleUrl: './configuration-pointage.component.css',
})
export class ConfigurationPointageComponent implements OnInit {

    public heure_initiale: any = '00:00'; /** Heure d'entrée initiale */
    public heure_tolerance: any = '00:00'; /** Heure d'entrée tolérable */
    public heure_sortie: any = '00:00'; /** Heure de sortie */
    public total_hour_of_work: any ; // Nombre d'heure de travail
    public break_time: any = '00:00'; // Nombre d'heure de pause

    public loading: boolean = false;
    public let_start: boolean = false;
    public config_data: any;
    public is_updated: boolean = false;
    public heure_entre: any = '00:00';
    public heure_tolerable: any = '00:00';
    public heure_out: any = '00:00';

    public hour_slug: string = '';

    constructor(
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {


    }

    ngOnInit(): void {
        this.getPointageConfigData();
    }



    getPointageConfigData()
    {
        this._loading.show_loading();

        this._traitement.getPointageConfig().subscribe({

            next: (response: any) => {

                setTimeout(() => {
                    if(response != null)
                        {
                            this.heure_entre = this.formatTimeToHoursMinutes(response.initial_hour);
                            this.heure_tolerable = this.formatTimeToHoursMinutes(response.tolerable_hour);
                            this.heure_out = this.formatTimeToHoursMinutes(response.out_hour);
                            this.break_time = this.formatTimeToHoursMinutes(response.break_time);


                            this.heure_initiale = this.formatTimeToHoursMinutes(response.initial_hour) ;
                            this.heure_sortie = this.formatTimeToHoursMinutes(response.out_hour);
                            this.heure_tolerance = this.formatTimeToHoursMinutes(response.tolerable_hour);
                            this.break_time = this.formatTimeToHoursMinutes(response.break_time);
                            this.is_updated = true;
                            this.hour_slug = response.slug;
                            this.total_hour_of_work = this.formatTimeToHoursMinutes(response.total_hour_of_work);

                        }
                        this._loading.hide_loading();
                }, 1000);

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

    isStarted() {this.is_updated = false;this.let_start = true;}

    isStartedTopUpdated() {this.let_start = true;}

    isCancelled() {this.let_start = false;this.is_updated = true;}

    saveConfig() {

        if (this.heure_initiale == undefined) {
            this._notificationService.openSnackBarSimpleError("L'heure initiale est obligatoire");
            return
        }
        if(this.heure_tolerance == undefined){
            this._notificationService.openSnackBarSimpleError("L'heure tolérable est obligatoire");
            return
        }

        if(this.heure_sortie == undefined){
            this._notificationService.openSnackBarSimpleError("L'heure de sortie est obligatoire");
            return
        }

        if(this.break_time == undefined){
            this._notificationService.openSnackBarSimpleError("Le nombre d'heure de pause est obligatoire");
            return
        }

        const total_hours = this.calculateDifferenceBetweenTwoHours(this.heure_initiale,this.heure_sortie)
        const data = {
            initial_hour: this.heure_initiale,
            tolerable_hour: this.heure_tolerance,
            out_hour: this.heure_sortie,
            break_time: this.break_time,
            total_hour_of_work: this.calculateDifferenceBetweenTwoHours(this.break_time,total_hours)
        }

        this.loading = true;
        //console.log(data); return;

        this._traitement.savePointageConfig(data).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.loading = false;
                        this.let_start = false;
                        this.getPointageConfigData()
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.loading = false;
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


    updateConfig(slug: string) {

        if (this.heure_initiale == undefined) {
            this._notificationService.openSnackBarSimpleError("L'heure initiale est obligatoire");
            return
        }
        if(this.heure_tolerance == undefined){
            this._notificationService.openSnackBarSimpleError("L'heure tolérable est obligatoire");
            return
        }

        if(this.heure_sortie == undefined){
            this._notificationService.openSnackBarSimpleError("L'heure de sortie est obligatoire");
            return
        }


        const total_hours = this.calculateDifferenceBetweenTwoHours(this.heure_initiale,this.heure_sortie)
        const data = {
            initial_hour: this.heure_initiale,
            tolerable_hour: this.heure_tolerance,
            out_hour: this.heure_sortie,
            break_time: this.break_time,
            total_hour_of_work: this.calculateDifferenceBetweenTwoHours(total_hours,this.break_time)
        }

        this.loading = true;
        //console.log(data); return;

        this._traitement.updatePointageConfig(data, slug).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.loading = false;
                        this.getPointageConfigData()
                        this.let_start = false;
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.loading = false;
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

    formatTimeToHoursMinutes(time: string): string {
        const [hour, minute] = time.split(':');
        return hour+':'+minute;
    }

    calculateDifferenceBetweenTwoHours(heure1: any, heure2: any) {

        if(heure1 != undefined && heure2 != undefined){
            let [heure1Heures, heure1Minutes] = heure1.split(':').map(Number);
            let [heure2Heures, heure2Minutes] = heure2.split(':').map(Number);

            // Calculer la différence en minutes
            let differenceEnMinutes = (heure2Heures * 60 + heure2Minutes) - (heure1Heures * 60 + heure1Minutes);

            // Calculer les heures et les minutes finales
            let heures = Math.floor(differenceEnMinutes / 60);
            let minutes = differenceEnMinutes % 60;

            if(heures >= 0 && minutes >= 0){
                return (heures >= 10?heures:'0'+heures)+':'+ (minutes >= 10?minutes:'0'+minutes) ;
            }{
                return '00:00'
            }
            //console.log((?heures:'0'+heures)+':'+ (?minutes:'0'+minutes))
        }else {
            return undefined;
        }
        // Convertir les heures en minutes
    }



}
