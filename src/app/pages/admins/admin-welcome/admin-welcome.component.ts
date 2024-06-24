import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexMarkers,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialModule } from '../../../material-module';
import { LoadingService } from '../../../services/loadings/loading.service';
import {
  NotificationService,
} from '../../../services/notifications/notification.service';
import {
  MainTreatmentsService,
} from '../../../services/treatments/main-treatments.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
};

export type ChartOptions2 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: any; // ApexStroke;
    markers: ApexMarkers;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-admin-welcome',
    standalone: true,
    imports: [NgxPaginationModule, NgApexchartsModule, MaterialModule, NgxSpinnerModule],
    templateUrl: './admin-welcome.component.html',
    styleUrl: './admin-welcome.component.css',
})
export class AdminWelcomeComponent implements OnInit {
    @ViewChild('chart')
    chart!: ChartComponent;

    public chartOptions: Partial<ChartOptions> | any;
    public chartOptions2: Partial<ChartOptions2> | any;

    public employees: number = 0;
    public employees_men: number = 0;
    public employees_women: number = 0;
    public courriers: number = 0;
    public courriers_treated: number = 0;
    public courriers_untreated: number = 0;
    public courriers_imputed_responsable: number = 0;
    public courriers_imputed_agents: number = 0;

    constructor(
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _router: Router,
        private _loading: LoadingService,
    ) {}

    ngOnInit(): void {

        this._loading.show_loading();
        setTimeout(() => {
            this.getStatistiqueData();
            this.getAdminCourrierManagerStatistique();

            this._loading.hide_loading();
        }, 1000);
    }

    globalStatistique(
        total_courriers: number[],
        courrier_traiter: number[],
        courrier_non_traiter: number[],
        month: string[]
    ) {
        return (this.chartOptions = {
            series: [
                {
                    name: 'TOTAL PUBLICATIONS',
                    type: 'column',
                    data: total_courriers,
                },
                {
                    name: 'PLUS VUES',
                    type: 'area',
                    data: courrier_traiter,
                },
                {
                    name: 'MOINS VUES',
                    type: 'line',
                    data: courrier_non_traiter,
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
            },
            stroke: {
                width: [0, 2, 5],
                curve: 'smooth',
            },
            plotOptions: {
                bar: {
                    columnWidth: '10%',
                },
            },

            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            labels: month,
            markers: {
                size: 0,
                opacity: 0.3,
                colors: ['#ef9100', '#f2a1a8'],
                strokeColor: '#ffffff',
                strokeWidth: 2,
                hover: {
                    size: 7,
                },
            },
            xaxis: {
                type: 'date',
            },
            yaxis: {
                title: {
                    text: 'Publications',
                },
                min: 0,
            },
            colors: ['#1f7554', '#0DB84F', '#ef9100'],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y: any) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0) + ' Publications';
                        }
                        return y;
                    },
                },
            },

        });
    }

    globalStatistique_2(
        courrier_imputed: number[],
        courrier_not_imputed: number[],
        month: string[]
    ) {
        return (this.chartOptions2 = {
            chart: {
                height: 350,
                type: 'area',

            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'stepline',
                width: 3,
            },
            series: [
                {
                    name: 'NBRE PERMISSIONS',
                    data: courrier_imputed,
                },
                {
                    name: 'NBRE CONGÉS',
                    data: courrier_not_imputed,
                },
            ],
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y: any) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0) + ' Demandes';
                        }
                        return y;
                    },
                },
            },
            grid: {
                borderColor: '#e0e6ed',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 10,
                    left: 0,
                },
            },
            xaxis: {
                categories: month,
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            colors: ['#1f7554', '#ef9100'],
            markers: {
                size: 0,
                opacity: 0.3,
                colors: ['#ef9100', '#f2a1a8'],
                strokeColor: '#ffffff',
                strokeWidth: 2,
                hover: {
                    size: 7,
                },
            },
        });
    }

    getStatistiqueData() {
        this._traitement.getAdminStatistique().subscribe({
            next: (response: any) => {

                console.log(response)
                this.employees = response.all_employee;
                this.employees_men = response.all_employee_men;
                this.employees_women = response.all_employee_women;
                // this.courriers = response.all_courrier;
                // this.courriers_treated = response.courrier_traiter;
                // this.courriers_untreated = response.courrier_non_traiter;
                // this.courriers_imputed_responsable =
                //     response.courrier_imputer_au_responsable;
                // this.courriers_imputed_agents =
                //     response.courrier_imputer_au_agent;
            },
            error: (error: any) => {
                if (error.status == 401) {
                    //return
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }

    getAdminCourrierManagerStatistique() {
        this._traitement.getAdminCourrierManagerStatistique().subscribe({
            next: (response: any) => {
                // console.log(response);

                this.globalStatistique(
                    response.total_courriers,
                    response.courrier_traiter,
                    response.courrier_non_traiter,
                    response.month
                );
                this.globalStatistique_2(
                    response.courrier_imputed,
                    response.courrier_not_imputed,
                    response.month
                );
            },
            error: (error: any) => {
                if (error.status == 401) {
                    //return
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }
}
