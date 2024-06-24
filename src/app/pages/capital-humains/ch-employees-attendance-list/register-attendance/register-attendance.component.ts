import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
    selector: 'app-register-attendance',
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
    templateUrl: './register-attendance.component.html',
    styleUrl: './register-attendance.component.css',
})
export class RegisterAttendanceComponent implements OnInit {

    public heure_initiale: any = '00:00'; /** Heure d'entrée initiale */
    public heure_tolerance: any = '00:00'; /** Heure d'entrée tolérable */
    public heure_sortie: any = '00:00'; /** Heure de sortie */
    public total_hour_of_work: any ; // Nombre d'heure de travail
    public break_time: any = '00:00'; // Nombre d'heure de pause


    public heure_entre: any = '00:00';
    public heure_tolerable: any = '00:00';
    public heure_out: any = '00:00';

    public hour_slug: string = '';


    public hour_start: any = '00:00';
    public hour_end: any = '00:00';
    public total_hour: any = '00:00';
    public overtime: any = '00:00';
    public date_start: Date = new Date();

    public employe_matricule: string = '';
    public list_employe: any = [];

    public check_total_hour_or_overtime: boolean = false;

    public list_current_pointage: any = [];


    constructor(
        //private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loadings: LoadingService,
        private _router: Router
    ) { }



    ngOnInit(): void {

        this._loadings.show_loading();

        setTimeout(() => {
            this.getEmployesList();
            this.getCurrentPointageList();
            this.getPointageConfigData();
            this._loadings.hide_loading();

        }, 1000);
    }


    formatTimeToHoursMinutes(time: string): string {
        const [hour, minute] = time.split(':');
        return hour+':'+minute;
    }




    getPointageConfigData()
    {
        this._traitement.getPointageConfig().subscribe({

            next: (response: any) => {
                if(response != null)
                {
                    this.heure_entre = this.formatTimeToHoursMinutes(response.initial_hour);
                    this.heure_tolerable = this.formatTimeToHoursMinutes(response.tolerable_hour);
                    this.heure_out = this.formatTimeToHoursMinutes(response.out_hour);
                    this.break_time = this.formatTimeToHoursMinutes(response.break_time);


                    this.heure_initiale = this.formatTimeToHoursMinutes(response.initial_hour) ;
                    this.heure_sortie = this.formatTimeToHoursMinutes(response.out_hour);
                    this.heure_tolerance = this.formatTimeToHoursMinutes(response.tolerable_hour);
                    this.total_hour_of_work = this.formatTimeToHoursMinutes(response.total_hour_of_work);
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






    onChangeEmployes(event: any)
    {
        this.employe_matricule = event.value;
    }

    getEmployesList() {

        this._traitement.getEmployes().subscribe({

            next: (response: any) => {
                console.log(response);
                setTimeout(() => {
                    this.list_employe = response
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        });
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


    //
    checkEndTime(event: any){

        if(event != '00:00'){

            const total_hours = this.calculateDifferenceBetweenTwoHours(this.hour_start, this.hour_end );
            const total_hour_of_works = this.calculateDifferenceBetweenTwoHours(this.break_time,total_hours)
            this.overtime = this.calculateDifferenceBetweenTwoHours(this.total_hour_of_work,total_hour_of_works );
            this.total_hour = total_hour_of_works;

            this.check_total_hour_or_overtime = true;
            //console.log(this.total_hour, "Over"+ this.overtime , "Break_time" + this.total_hour_of_work)
        }else{
            this.check_total_hour_or_overtime = false;
        }
        //console.log(event)
    }



    getCurrentPointageList() {

        this._traitement.getCurrentPointage().subscribe({

            next: (response: any) => {
                //console.log(response);
                setTimeout(() => {
                    this.list_current_pointage = response
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        });
    }


    saveAttendance() {


        if (this.employe_matricule == '') {
            this._notificationService.openSnackBarSimpleError("Aucun employé selectionné.");
            return
        }


        if(this.break_time == '00:00'){
            this._notificationService.openSnackBarSimpleError("L'heure de pause déjeuner est obligatoire");
            return
        }


        const data = {
            date_started: this.date_start,
            employe_matricule: this.employe_matricule,
            start_time: this.hour_start,
            end_time: this.hour_end,
            break_time: this.break_time,
            total_hour_of_work: this.total_hour,
            heure_tolerable: this.heure_tolerable,

            overtime: this.overtime
        }

        this._loadings.show_loading();
        
        //console.log(data); return;

        this._traitement.savePointage(data).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loadings.hide_loading();

                        this.getCurrentPointageList()

                        this.initInput();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loadings.hide_loading();
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


    initInput()
    {
        this. hour_start = '00:00';
        this. hour_end = '00:00';
        this. total_hour = '00:00';
        this. overtime = '00:00';

        this.check_total_hour_or_overtime = false;
    }
}
