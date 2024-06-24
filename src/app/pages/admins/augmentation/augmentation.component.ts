import { AugmentationService } from './../../../services/treatments/augmentation/augmentation.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { AddBureauComponent } from '../../../dialogs/admin-dialogs/add-bureau/add-bureau.component';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../material-module';
import fr from '@angular/common/locales/fr';
import { AdminConsultePermissionComponent } from '../../../dialogs/admin-dialogs/gestion-demande/admin-consulte-permission/admin-consulte-permission.component';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { AddAugmentationComponent } from '../../../dialogs/admin-dialogs/add-augmentation/add-augmentation.component';

@Component({
  selector: 'app-augmentation',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    TransformDatePipe,
    TransformTextPipe,
    RouterModule
  ],
  templateUrl: './augmentation.component.html',
  styleUrl: './augmentation.component.css'
})
export class AugmentationComponent implements OnInit {

    public list_augmentation: any = [];

    public augmentation_counter: number = 0;
    public user_id: string = "";
    public p: number = 1;

    constructor(
        private _dialog: MatDialog,
        private _augment: AugmentationService,
        private _notificationService: NotificationService,
        private _loadings: LoadingService,
        private _router: Router,
        private _userData: UserDataManagerService
    ){
        // registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        this.user_id = this._userData.getUserData().user_id;
        this.getAugments();
    }

    getAugments() {

        this._loadings.show_loading();

        this._augment.getAugments('employe_matricule').subscribe({

            next: (response: any) => {
                console.log(response)

                this.list_augmentation = response;
                this.augmentation_counter = this.list_augmentation.length;

                this._loadings.hide_loading();
                
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


    consulteAugmentation(data: any) {
        const dialogRef = this._dialog.open(AdminConsultePermissionComponent,
            {
                data: data,
                panelClass: 'fullscreen-dialog'
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAugments();
                }
            },
        });
    }

    deleteAugmentation(slug: string) {

        const dialogRef = this._dialog.open(DeleteComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._augment.deleteAugmentation(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._notificationService.openSnackBarSuccess(response);
                                this.getAugments();

                            } else if (response.code == 404) {
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
            },
        });
    }

    openAugmentDialog() {
        const dialogRef = this._dialog.open(AddAugmentationComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getAugments();
                }
            },
        });
    }
    
}
