import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-admin-employees-profil',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        TransformDatePipe,
        FormsModule,
        NgxSpinnerModule
    ],
    templateUrl: './admin-employees-profil.component.html',
    styleUrl: './admin-employees-profil.component.css',
})
export class AdminEmployeesProfilComponent implements OnInit {
    // EMPLOYE INFO VARIBLE
    public first_name: string = ''; //OK
    public last_name: string = ''; //OK
    public diplome: string = ''; //OK
    public matricule: string = ''; //OK
    public adresse_email: string = ''; // OK;
    public genre: any; //OK;
    public telephone: string = ''; //OK ;
    public photo!: File;
    public situation_matrimoniale: any; // OK ;
    public nombre_enfant_a_charge: any = 0;
    public nationalite: string = '';
    public date_naissance: any = new Date(); //OK ;
    public lieu_naissance: string = ''; // OK ;
    public type_piece: string = '';
    public piece_number: string = '';
    public lieu_residence: string = ''; // OK ;
    public cnps_number: string = '';
    public status_info: any;

    public status_contrats: any;

    public is_disabled: boolean = true;
    public is_disabled_contrats: boolean = true;

    public fonction: any;
    public profession: string = '';
    public service: any;
    public service_id!: number;
    public bureau: any;
    public contrats: any;
    public categorie_pro: any;
    public date_embauche: any = new Date();
    public salaire_categoriel: any = 0;
    public salaire_net_mensuel: any = 0;
    public item_slug: any;
    public item_slug_info: any;
    public item_slug_contrats: any;
    public old_image: string = '';
    public img_update: boolean = true;
    public user_image!: File;

    public is_responsible: any;
    public is_agents: any;
    public selectedServiceOption: any;
    public selectedGenreOption: any;
    public selectedPieceOption: any;
    public selectedContratsOption: any;
    public selectedBureauOption: any;
    public selectedCategorieProfessionnelleOption: any;

    public list_fonction: any = [];
    public list_service: any = [];

    public piece: any;

    public list_categorie_pro: any = [];
    public list_contrats: any = [];
    public list_bureau: any = [];
    public phone: string = '';

    public first_step: boolean = false;
    public second_step: boolean = false;
    public fird_step: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _loadings: LoadingService,
        private _router: Router,
        private _active_router: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getEmployeCurrentInfo();
    }

    getEmployeCurrentInfo() {
        this.item_slug = this._active_router.snapshot.paramMap.get('slug');

        this._loadings.show_loading();

        this._traitement.showEmployes(this.item_slug).subscribe({
            next: (response: any) => {
                // INFORMATION PERSONNELLE
                this.first_name = response.employe_info_perso.first_name;
                this.matricule = response.employe_info_perso.matricule;
                this.last_name = response.employe_info_perso.last_name;
                this.diplome = response.employe_info_perso.diplome;
                this.adresse_email = response.employe_info_perso.adresse_email;
                this.date_naissance =
                    response.employe_info_perso.date_naissance;
                this.lieu_naissance =
                    response.employe_info_perso.lieu_naissance;
                this.cnps_number = response.employe_info_perso.cnps_number;
                this.piece_number = response.employe_info_perso.piece_number;
                this.nationalite = response.employe_info_perso.nationalite;
                this.nombre_enfant_a_charge =
                    response.employe_info_perso.nombre_enfant_a_charge;
                this.lieu_residence =
                    response.employe_info_perso.lieu_residence;
                this.situation_matrimoniale =
                    response.employe_info_perso.situation_matrimoniale;
                this.genre = response.employe_info_perso.genre;
                this.type_piece = response.employe_info_perso.type_piece;
                this.telephone = response.employe_info_perso.telephone;
                this.old_image = response.employe_info_perso.photo;
                this.item_slug_info = response.employe_info_perso.slug;
                this.is_agents = response.employe_info_perso.is_agents;
                this.is_responsible =
                    response.employe_info_perso.is_responsible;
                this.profession = response.employe_info_perso.profession;

                //INFORMATION SUR LE CONTRAT

                this.categorie_pro =
                    response.employe_info_contrats.categorie_pro;
                this.fonction = response.employe_info_contrats.fonction;
                this.service = response.employe_info_contrats.service;
                this.service_id = response.employe_info_contrats.service_id;
                this.contrats = response.employe_info_contrats.contrats;
                this.bureau = response.employe_info_contrats.bureau;
                this.salaire_categoriel =
                    response.employe_info_contrats.salaire_categoriel;
                this.date_embauche =
                    response.employe_info_contrats.date_embauche;
                this.salaire_net_mensuel =
                    response.employe_info_contrats.salaire_mensuel_net;
                this.item_slug_contrats = response.employe_info_contrats.slug;

                this._loadings.hide_loading();
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }

}
