import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexPlotOptions, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../../material-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loadings/loading.service';


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



@Component({
    selector: 'app-ch-welcome',
    standalone: true,
    imports: [
        NgxPaginationModule,
        NgApexchartsModule,
        MaterialModule,
        NgxSpinnerModule,
    ],
    templateUrl: './ch-welcome.component.html',
    styleUrl: './ch-welcome.component.css',
})
export class ChWelcomeComponent implements OnInit {

    @ViewChild("chart")
    chart!: ChartComponent;



    public capital_net: number = 0;
    public profit_on_current_sale: number = 0;
    public current_sale: number = 0;

    public employees: number = 0;
    public employees_men: number = 0;
    public employees_women: number = 0;
    public cumule_presence: number = 0;
    public cumule_absence: number = 0;

    public cumule_presence_chart: number[] = [];
    public cumule_absence_chart: number[] = [];

    public chartOptions: Partial<ChartOptions> | any;


    constructor(
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _router: Router,
        private _loading: LoadingService,
    ) {}



    ngOnInit(): void {

        this.getRhAttendanceStatistique();
        this.getStatistiqueData();
    }


    globalStatistique(data_presence: number[], data_absence: number[], month: string[])
    {
        return this.chartOptions = {

            chart: {
                height: 300,
                type: "area",
                toolbar: {
                    show: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "stepline",
                width: 3,
            },
            series: [
                {
                    name: "Présence",
                    data: data_presence,
                },
                {
                    name: "Absence",
                    data: data_absence,
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
            
            grid: {
                borderColor: "#e0e6ed",
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
            colors: ["#1f7554", "#ef9100"],
            markers: {
                size: 0,
                opacity: 0.3,
                colors: ["#ef9100", "#f2a1a8"],
                strokeColor: "#ffffff",
                strokeWidth: 2,
                hover: {
                    size: 7,
                },
            },
        };
    }


    getStatistiqueData()
    {
        this._traitement.getRhStatistique().subscribe({

            next: (response: any) => {

                this.employees = response.all_employee;
                this.employees_men = response.all_employee_men;
                this.employees_women = response.all_employee_women;
                // this.cumule_presence = response.cumule_presence;
                // this.cumule_absence = response.cumule_absence;

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

    getRhAttendanceStatistique()
    {
        this._traitement.getRhAttendanceStatistique().subscribe({

            next: (response: any) => {

                console.log(response);
                this.globalStatistique(response.cumule_presence,response.cumule_absence, response.month )

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
}
