import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckAuthorisationComponent } from '../../actions/check-authorisation/check-authorisation.component';

@Component({
    selector: 'app-employees-profil',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
    ],
    templateUrl: './employees-profil.component.html',
    styleUrl: './employees-profil.component.css',
})
export class EmployeesProfilComponent implements OnInit {

    public user_name: string = '';
    public employe_matricule: any;
    public photo: string = '';
    public screenWidth!: number;

    public current_route: string = '';

    public code_autorisation: string = '';
    public code_owners: string = '';

    // EMPLOYE INFO VARIBLE
    public first_name: string = ''; //OK
    public last_name: string = ''; //OK
    public diplome: string = ''; //OK
    public matricule: string = ''; //OK
    public adresse_email: string = ''; // OK;
    public genre: any;//OK;
    public telephone: string = ''; //OK ;
    public situation_matrimoniale: any; // OK ;
    public nombre_enfant_a_charge: any = 0;
    public nationalite: string = '';
    public date_naissance: any = new Date; //OK ;
    public lieu_naissance: string = ''; // OK ;
    public piece_number: string = '';
    public lieu_residence: string = ''; // OK ;
    public cnps_number: string = '';
    public status_info: any;

    public personne_a_contacter: string = "";
    public contact_personne_a_contacter: string = "";
    public nombre_personne_a_charge: string = "";
    public personne_a_charge: string = "";
    public conjoint_name: string = "";
    public contact_conjoint: string = "";
    public antecedant_medicaux: string = "";

    // contrats
    public status_contrats: any;

    public is_disabled: boolean = true;
    public is_disabled_contrats: boolean = true;

    public fonction: any;
    public profession: string = '';
    public service: any;
    public bureau: any;
    public contrats: any;
    public categorie_pro: any;
    public date_embauche: string = '';
    public salaire_categoriel: any = 0;
    public salaire_net_mensuel: any = 0;
    public item_slug: any;
    public item_slug_info: any;
    public item_slug_contrats: any;
    public old_image: string = '';
    public img_update: boolean = true;
    public user_image!: File;

    public hideMoney: boolean = true;
    public money_categoriel: any = 0;
    public money_brut: any = 0;

    public selectedFonctionOption: any;
    public selectedSituationMatrimonialeOption: any;
    public selectedServiceOption: any;
    public selectedGenreOption: any;
    public selectedPieceOption: any;
    public selectedContratsOption: any;
    public selectedBureauOption: any;
    public selectedCategorieProfessionnelleOption: any;


    public list_fonction: any = [];
    public list_service: any = [];
    public list_genre: any = [{id: 1,genre: "Homme"},{id: 2,genre: "Femme"}];
    public list_piece: any = [{id: 1,piece: "Carte Nationale d'Identité"},{id: 2,piece: "PassePort"}];
    public list_situation_matrimoniale: any = [
        {id: 1,situation_matrimoniale: "Célibataire"},
        {id: 2,situation_matrimoniale: "Marié(e)"},
        {id: 3,situation_matrimoniale: "Veuf(ve)"},
        {id: 3,situation_matrimoniale: "Divorcé(e)"},

    ];

    public piece: any;

    public list_categorie_pro: any = [];
    public list_contrats: any = [];
    public list_bureau: any = [];
    public phone: string = '';



    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loadings: LoadingService,
        private _userData: UserDataManagerService,
        private _location: Location,
        private _dialogs: MatDialog
    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };

        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.current_route = event.url;
            }
        }
        );
    }



    ngOnInit(): void {
        this.employe_matricule = this._userData.getUserData().employe_matricule;
        this.getEmployeProfilInfo()
    }

    back() {
        this._location.back();
    }


    edited(enterAnimationDuration: string, exitAnimationDuration: string)
    {
        const dialogRef = this._dialogs.open(CheckAuthorisationComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                //console.log(val)
                if (val.code_authorization_data.code) {

                    this.code_autorisation = val.code_authorization_data.code;
                    this.code_owners = val.code_authorization_data.owners;
                    this.is_disabled = false;
                }else{
                    this.is_disabled = false;
                }
            },
        });

    }

    cancel()
    {
        this.is_disabled = true;
    }


    selectGenre(event: any) {
        this.genre = event.value;
    }

    selectPiece(event: any) {
        this.piece = event.value;
    }

    selectSituationMatrimoniale(event: any) {
        this.situation_matrimoniale = event.value;
    }

    getEmployeProfilInfo() {


        this._traitement.getEmployeProfilInfo(this.employe_matricule).subscribe({
            next: (response: any) => {
                //console.log(response);
                // INFORMATION PERSONNELLE
                this.first_name = response.employe_info_perso.first_name;
                this.matricule = response.employe_info_perso.matricule;
                this.last_name = response.employe_info_perso.last_name;
                this.diplome = response.employe_info_perso.diplome;
                this.adresse_email = response.employe_info_perso.adresse_email;
                this.date_naissance = response.employe_info_perso.date_naissance;
                this.lieu_naissance = response.employe_info_perso.lieu_naissance;
                this.cnps_number = response.employe_info_perso.cnps_number;
                this.piece_number = response.employe_info_perso.piece_number;
                this.nationalite = response.employe_info_perso.nationalite;
                this.nombre_enfant_a_charge = response.employe_info_perso.nombre_enfant_a_charge;
                this.lieu_residence = response.employe_info_perso.lieu_residence;
                this.selectedSituationMatrimonialeOption = response.employe_info_perso.situation_matrimoniale;
                this.selectedGenreOption = response.employe_info_perso.genre;
                this.selectedPieceOption = response.employe_info_perso.type_piece;
                this.phone = response.employe_info_perso.phone;
                this.photo = response.employe_info_perso.photo;
                this.item_slug_info = response.employe_info_perso.slug

                this.personne_a_contacter = response.employe_info_perso.personne_a_contacter;
                this.personne_a_charge = response.employe_info_perso.personne_a_charge;
                this.conjoint_name = response.employe_info_perso.conjoint_name;
                this.contact_conjoint = response.employe_info_perso.contact_conjoint;
                this.antecedant_medicaux = response.employe_info_perso.antecedant_medicaux;
                this.contact_personne_a_contacter = response.employe_info_perso.contact_personne_a_contacter;
                this.situation_matrimoniale = response.employe_info_perso.situation_matrimoniale;

                this.money_brut = response.employe_info_contrats.salaire_mensuel_net;
                this.money_categoriel = response.employe_info_contrats.salaire_categoriel;

                this.profession = response.employe_info_perso.profession;



                this.old_image = response.employe_info_perso.photo;

                //INFORMATION SUR LE CONTRAT
                console.log(response.employe_info_contrats)
                this.categorie_pro = response.employe_info_contrats.categorie_pro;
                this.fonction = response.employe_info_contrats.fonction;
                this.contrats = response.employe_info_contrats.contrats;
                this.bureau = response.employe_info_contrats.bureau;
                this.service = response.employe_info_contrats.service;
                this.date_embauche = response.employe_info_contrats.date_embauche;
                this.salaire_categoriel = response.employe_info_contrats.salaire_categoriel;
                this.salaire_net_mensuel = response.employe_info_contrats.salaire_mensuel_net;
                this.item_slug_contrats = response.employe_info_contrats.slug
            },
            error: (error: any) => {

                //console.log(error.status)
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            }
        });
    }


    updateEmployeInformationPersonnelle() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError("Le nom est obligatoire");
            return
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError("Le prénom est obligatoire");
            return
        }

        if (this.diplome == '') {
            this._notificationService.openSnackBarSimpleError("Le diplôme est obligatoire");
            return
        }

        if (this.adresse_email == '') {
            this._notificationService.openSnackBarSimpleError("L'adresse email est obligatoire");
            return
        }



        if (this.date_naissance == '') {
            this._notificationService.openSnackBarSimpleError("La date de naissance est obligatoire");
            return
        }
        if (this.lieu_naissance == '') {
            this._notificationService.openSnackBarSimpleError("Le lieu de naissance est obligatoire");
            return
        }

        if (this.lieu_residence == '') {
            this._notificationService.openSnackBarSimpleError("Le lieu de residence est obligatoire");
            return
        }

        if (this.phone == '') {
            this._notificationService.openSnackBarSimpleError("Le téléphone est obligatoire");
            return
        }



        if (this.nationalite == '') {
            this._notificationService.openSnackBarSimpleError("La nationalité est obligatoire");
            return
        }

        if (this.profession == '') {
            this._notificationService.openSnackBarSimpleError(
                'La profession est obligatoire'
            );
            return;
        }



        if (this.piece_number == '') {
            this._notificationService.openSnackBarSimpleError("Le numéro de la pièce est obligatoire");
            return
        }

        const data = {
            first_name: this.first_name,
            last_name: this.last_name,
            diplome: this.diplome,
            profession: this.profession,
            adresse_email: this.adresse_email,
            phone: this.phone ,
            genre: this.genre == undefined ? this.selectedGenreOption : this.genre,
            situation_matrimoniale: this.situation_matrimoniale == undefined ? this.selectedSituationMatrimonialeOption : this.situation_matrimoniale,
            date_naissance: this.date_naissance,
            lieu_naissance: this.lieu_naissance,
            lieu_residence: this.lieu_residence,
            code_autorisation: this.code_autorisation,
            code_owners: this.code_owners,
            nationalite: this.nationalite,
            type_piece: this.piece == undefined ? this.selectedPieceOption : this.piece,
            piece_number: this.piece_number,
            cnps_number: this.cnps_number,
            nombre_enfant_a_charge: this.nombre_enfant_a_charge,

            personne_a_contacter: this.personne_a_contacter,
            personne_a_charge: this.personne_a_charge,
            conjoint_name: this.conjoint_name,
            contact_conjoint: this.contact_conjoint,
            antecedant_medicaux: this.antecedant_medicaux,
            contact_personne_a_contacter: this.contact_personne_a_contacter,

        }

        //console.log(data);
        //return


        this._loadings.show_loading();

        this._traitement.updateEmployes(data, this.item_slug_info).subscribe({

            next: (response: any) => {
                //console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loadings.hide_loading();
                        this.is_disabled = true
                        //console.log(this.status_info);
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

}
