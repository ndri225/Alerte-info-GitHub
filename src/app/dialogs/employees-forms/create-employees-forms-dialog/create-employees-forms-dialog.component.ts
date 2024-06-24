import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { Router } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhoneNumberUtil } from 'google-libphonenumber';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-create-employees-forms-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './create-employees-forms-dialog.component.html',
    styleUrl: './create-employees-forms-dialog.component.css',
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },  
    ],
})
export class CreateEmployeesFormsDialogComponent implements OnInit {
    public is_loading: boolean = false;

    public version: string = '';


    // EMPLOYE INFO VARIABLE
    public first_name: string = ''; //OK
    public last_name: string = ''; //OK
    public adresse_email: string = ''; // OK;
    public genre: any; //OK;
    public phone: string = ''; //OK ;
    public photo!: File;
    public situation_matrimoniale: any; // OK ;
    public nombre_enfant_a_charge: any = 0;
    public nationalite: string = '';
    public date_naissance: any = new Date(); //OK ;
    public lieu_naissance: string = ''; // OK ;
    public piece_number: string = '';
    public piece: any;
    public lieu_residence: string = ''; // OK ;
    public cnps_number: string = '';
    public diplome: string = '';
    public profession: string = '';
    public status_info: any;
    public code_autorisation: string = '';
    public code_owners: string = '';
    public selectedGenreOption: any;

    public personne_a_contacter: string = "";
    public contact_personne_a_contacter: string = "";
    public nombre_personne_a_charge: string = "";
    public personne_a_charge: string = "";

    public conjoint_name: string = "";
    public contact_conjoint: string = "";
    public antecedant_medicaux: string = "";

    public list_genre: any = [
        { id: 1, genre: 'Homme' },
        { id: 2, genre: 'Femme' },
    ];
    public list_piece: any = [
        { id: 1, piece: "Carte Nationale d'Identité" },
        { id: 2, piece: 'PassePort' },
    ];
    public list_situation_matrimoniale: any = [
        { id: 1, situation_matrimoniale: 'Célibataire' },
        { id: 2, situation_matrimoniale: 'Marié(e)' },
        { id: 3, situation_matrimoniale: 'Veuf(ve)' },
        { id: 3, situation_matrimoniale: 'Divorcé(e)' },
    ];

    public selectedSituationMatrimonialeOption: any;
    public selectedPieceOption: any;
    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CreateEmployeesFormsDialogComponent>,
    ) {
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        if (this.data != null) {
            if(this.data.action == 'create_on_frontend'){
                this.code_autorisation = this.data.code_autorisation;
                this.code_owners = this.data.code_owners;
            }
            //console.log(this.data)
        }
    }

    // REGISTERED EMPLOYEE INFORMATION

    selectSituationMatrimoniale(event: any) {
        this.situation_matrimoniale = event.value;
    }

    selectGenre(event: any) {
        this.genre = event.value;
    }

    selectPiece(event: any) {
        this.piece = event.value;
    }

    uploadFile(e: any) {
        this.photo = e.target.files[0];
    }

    validateNumber(phoneNumber: string): boolean {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();

        try {
            const parsedNumber = phoneNumberUtil.parse(phoneNumber, 'ZZ');
            return phoneNumberUtil.isValidNumber(parsedNumber);
        } catch (error) {
            return false; // Invalid phone number format
        }
    }

    SaveEmployeInformation() {

        try {
            if (this.first_name == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le nom est obligatoire'
                );
                return;
            }
            if (this.profession == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La profession est obligatoire'
                );
                return;
            }

            if (this.last_name == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le prénom est obligatoire'
                );
                return;
            }

            if (this.diplome == '') {
                this._notificationService.openSnackBarSimpleError(
                    "L'intitulé du diplôme est obligatoire"
                );
                return;
            }

            if (this.adresse_email == '') {
                this._notificationService.openSnackBarSimpleError(
                    "L'adresse email est obligatoire"
                );
                return;
            }

            if (this.genre == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le genre est obligatoire'
                );
                return;
            }

            if (this.date_naissance == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La date de naissance est obligatoire'
                );
                return;
            }
            if (this.lieu_naissance == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le lieu de naissance est obligatoire'
                );
                return;
            }

            if (this.lieu_residence == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le lieu de residence est obligatoire'
                );
                return;
            }

            if (this.personne_a_contacter == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le nom de la personne à contacter est obligatoire'
                );
                return;
            }


            if(this.validateNumber(this.phone) == false || this.phone == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le format du numéro de téléphone est invalide ou obligatoire ! Ex: +2250000000000'
                );
                return;
            }

            if (this.situation_matrimoniale == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La situation matrimoniale est obligatoire'
                );
                return;
            }

            if (this.nationalite == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La nationalité est obligatoire'
                );
                return;
            }

            if (this.piece == undefined) {
                this._notificationService.openSnackBarSimpleError(
                    'Le type de la pièce est obligatoire'
                );
                return;
            }
            if (this.piece_number == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le numéro de la pièce est obligatoire'
                );
                return;
            }
            //INAZ12I5
            
            const formData: FormData = new FormData();
            formData.append('first_name', this.first_name);
            formData.append('last_name', this.last_name);
            formData.append('diplome', this.diplome);
            formData.append('profession', this.profession);
            formData.append('adresse_email', this.adresse_email);
            formData.append('phone', this.phone);
            formData.append('personne_a_contacter', this.personne_a_contacter);
            formData.append('personne_a_contacter', this.personne_a_contacter);
            formData.append('personne_a_charge', this.personne_a_charge);
            formData.append('conjoint_name', this.conjoint_name);
            formData.append('contact_conjoint', this.contact_conjoint);
            formData.append('antecedant_medicaux', this.antecedant_medicaux);




            formData.append('contact_personne_a_contacter', this.contact_personne_a_contacter);

            formData.append(
                'genre',
                this.genre != undefined ? this.selectedGenreOption : this.genre
            );
            formData.append(
                'situation_matrimoniale',
                this.situation_matrimoniale != undefined
                    ? this.selectedSituationMatrimonialeOption
                    : this.situation_matrimoniale
            );
            formData.append('date_naissance', this.formatDate(this.date_naissance));

            formData.append('lieu_naissance', this.lieu_naissance);
            formData.append('lieu_residence', this.lieu_residence);

            formData.append('code_autorisation', this.code_autorisation);
            formData.append('code_owners', this.code_owners);

            formData.append('nationalite', this.nationalite);
            formData.append(
                'type_piece',
                this.piece != undefined ? this.selectedPieceOption : this.piece
            );
            formData.append('piece_number', this.piece_number);
            // formData.append('cnps_number', this.cnps_number);
            formData.append('nombre_enfant_a_charge', this.nombre_enfant_a_charge);
            formData.append(
                'employe_photo',
                this.photo != undefined ? this.photo : ''
            );

            this.is_loading = true;

            this._traitement.saveEmployes(formData).subscribe({
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
        } catch (error) {
            console.log(error);
        }

    }

    // FORMAT DATE FUNCTION

    formatDate(date: any) {
        let year = date.toLocaleString('default', { year: 'numeric' });
        let month = date.toLocaleString('default', { month: '2-digit' });
        let day = date.toLocaleString('default', { day: '2-digit' });

        return year + '-' + month + '-' + day;
    }
}
