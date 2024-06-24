import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { MissionService } from '../../../services/treatments/mission/mission.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { MaterialModule } from '../../../material-module';
import { AugmentationService } from '../../../services/treatments/augmentation/augmentation.service';

@Component({
  selector: 'app-add-augmentation',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AngularEditorModule,
    TransformDatePipe,
    DeleteComponent,

  ],
  templateUrl: './add-augmentation.component.html',
  styleUrl: './add-augmentation.component.css'
})
export class AddAugmentationComponent implements OnInit {


  config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '20rem',
      minHeight: '20rem',
      placeholder: "Entrer l'ordre de la mission ici",
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [
        ['bold']
        ],

        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],

      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };
    

public employe_matricule: string = '';

public fullscreen: boolean = true;
public somme: string = '';
public augmentation_motif: string = '';

public is_choose: string = '';

public list_employes: any = [];
public employe_selected: any = '';

public date_augments: any;

constructor(
    private _traitement: MainTreatmentsService,
    private _router: Router,
    private _loading: LoadingService,
    private _userData: UserDataManagerService,
    private _notificationService: NotificationService,
    private _augments: AugmentationService,

){}

ngOnInit(): void {

    this.employe_matricule = this._userData.getUserData().employe_matricule;
    this.getAllEmployes();
}

radioChange(event: any) {

    this.is_choose = event.value;

}

// MissionDurationChange(event: any)
// {
//     let res = event.value;

//     if(res === 'date'){
//         this.duration_is_date = true;
//     }else{
//         this.duration_is_date = false;
//     }
// }

// switchAction(data: string) {
//     if (data == "assigments") {
//         this.is_switching_assigment = true;
//         this.is_switching_leave = false;
//         this.switcher_is_active = true;
//     }

//     if (data == "leave") {
//         this.is_switching_leave = true;
//         this.is_switching_assigment = false;
//         this.switcher_is_active = false;
//     }
// }

onChangeListeemploye(event: any) {
    this.employe_selected = event.value
  //   console.log(event)
}

//   onChangeListeBureau(event: any) {
//       this.list_bureau = event.value
//   }


getAllEmployes() {

  this._loading.show_loading();
  this._traitement.getEmployes().subscribe({

      next: (response: any) => {
          setTimeout(() => {
              this.list_employes = response

              // console.log(this.list_employes)
              this._loading.hide_loading();
          }, 700);
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


// getAllBureau() {

//   this._loading.show_loading();
//   this._traitement.getBureau().subscribe({

//       next: (response: any) => {
//           setTimeout(() => {
//               this.list_bureau = response
//               this._loading.hide_loading();
//           }, 1000);
//       },
//       error: (error: any) => {
//           if (error.status == 401) {
//               this._notificationService.openSnackBarTokenExpired();
//               localStorage.clear();
//               this._router.navigateByUrl('/');

//           }
//       }
//   });
// }

saveAugments() {
  // console.log(this.date_start, this.date_end, this.date_mission);
  
  this._loading.show_loading();

//   let duree_jour = this.calculateDifferenceBetweenDates(this.date_start, this.date_end);

//   console.log(duree_jour);
  //return;
  const formData: FormData = new FormData();
  formData.append("employe_matricule", this.employe_selected);
  formData.append("somme", this.somme);
  // formData.append("date_mission", this.formatDate(this.date_mission).toString());


  formData.append("date_augments", this.formatDate(this.date_augments).toString());

  formData.append("augmentation_motif", this.augmentation_motif);

  this._augments.addAugments(formData).subscribe({

      next: (response: any) => {
          console.log(response);
          if (response.code == 200) {
              this._notificationService.openSnackBarSuccess(response);
              setTimeout(() => {
                  this._loading.hide_loading();
                  this._router.navigateByUrl('/admin.augmentation');
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


formatDate(date: any)
{
  let year = date.toLocaleString("default", { year: "numeric" });
  let month = date.toLocaleString("default", { month: "2-digit" });
  let day = date.toLocaleString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
}


// CALCULATE DATE DURATION
calculateDifferenceBetweenDates(date1: any, date2: any): any {
    if(date1 != undefined && date2 != undefined) {
        let differenceEnMilliseconds = Math.abs(date2.getTime() - date1.getTime());
        let differenceEnJours = differenceEnMilliseconds / (1000 * 3600 * 24);
        return (differenceEnJours).toString() + 'Jour(s)';
    } else {
        return undefined;
    }
}
}
