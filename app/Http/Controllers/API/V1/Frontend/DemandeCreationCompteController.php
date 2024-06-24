<?php

namespace App\Http\Controllers\API\V1\Frontend;

use App\Http\Controllers\Controller;
use App\Models\RessourceHumaine\EmployeInformationModels;
use App\Services\CodeGenerator;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DemandeCreationCompteController extends Controller
{

    public $employe_photo;

    public function index()
    {

        return response()->json(
            [
                "app_name" => env('APP_NAME'),
                "message" => "Bienvenue à ".env('APP_NAME'),
                "subjet"   => "API REST",

            ]
        );
    }


    public function store(Request $request)
    {
        //return $request->all();
        try {
            if(empty($request->first_name)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le nom est obligatoire"
                    ]
                );
            endif;

            if(empty($request->last_name)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le prénom est obligatoire"
                    ]
                );
            endif;


            if(empty($request->diplome)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le diplôme est obligatoire"
                    ]
                );
            endif;
            if(empty($request->contact_personne_a_contacter)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le contact de la personne a contacter est obligatoire"
                    ]
                );
            endif;

            if(empty($request->type_piece)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le type de la pièce est obligatoire"
                    ]
                );
            endif;

            if(empty($request->date_naissance)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! La date de naissance est obligatoire"
                    ]
                );
            endif;
            if(empty($request->conjoint_name)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le nom du conjoint est obligatoire"
                    ]
                );
            endif;

            if(empty($request->lieu_naissance)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le lieu de naissance est obligatoire"
                    ]
                );
            endif;

            if(empty($request->genre)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le genre (sexe) est obligatoire"
                    ]
                );
            endif;

            if(empty($request->situation_matrimoniale)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le lieu de residence est obligatoire"
                    ]
                );
            endif;

            if(empty($request->lieu_residence)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le lieu de naissace est obligatoire"
                    ]
                );
            endif;

            if(empty($request->nationalite)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! La nationalité est obligatoire"
                    ]
                );
            endif;

            if(empty($request->piece_number)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le N° de la pièce est obligatoire"
                    ]
                );
            endif;


            if(empty($request->code_autorisation)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Le code d'autorisation est obligatoire"
                    ]
                );
            endif;

            if(empty($request->profession)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Votre profession est obligatoire"
                    ]
                );
            endif;

            if(empty($request->personne_a_contacter)):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! Votre personne est obligatoire"
                    ]
                );
            endif;




            $checkEmploye = DB::table('employe_information_models')->where('adresse_email',$request->email)->first();

            if($checkEmploye != null):
                return response()->json(
                    [
                        'code' => 302,
                        'status' => 'erreur',
                        'message' => "Erreur! L'adresse email est déjà utilisée pour un autre employé"
                    ]
                );
            endif;

            //return  CodeGenerator::generateEmployeMatricule();

            $this->employe_photo = UploadService::upload_employe_photo($request);

            if($this->employe_photo == "error"):
                return response()->json(
                    [
                        'code' => "302",
                        'message' => "L'enregistrement de la photo a échoué."
                    ]
                );
            endif;

            $store_employe_info = new EmployeInformationModels();

            $store_employe_info->employe_code = CodeGenerator::generateEmployeCode();
            $store_employe_info->matricule = CodeGenerator::generateEmployeMatricule();

            $store_employe_info->first_name = $request->first_name;
            $store_employe_info->last_name = $request->last_name;
            $store_employe_info->diplome = $request->diplome;
            $store_employe_info->profession = $request->profession;
            $store_employe_info->adresse_email = $request->adresse_email;
            $store_employe_info->personne_a_charge = $request->personne_a_charge;
            $store_employe_info->phone = $request->phone;
            $store_employe_info->date_naissance = $request->date_naissance;
            $store_employe_info->lieu_naissance = $request->lieu_naissance;
            $store_employe_info->personne_a_contacter = $request->personne_a_contacter;
            $store_employe_info->contact_personne_a_contacter = $request->contact_personne_a_contacter;

            $store_employe_info->genre = $request->genre;
            $store_employe_info->conjoint_name = $request->conjoint_name;
            $store_employe_info->contact_conjoint = $request->contact_conjoint;
            $store_employe_info->antecedent_medical = $request->antecedent_medicaux;
            $store_employe_info->situation_matrimoniale = $request->situation_matrimoniale;

            $store_employe_info->code_autorisation = $request->code_autorisation;
            $store_employe_info->code_owners = $request->code_owners;

            $store_employe_info->lieu_residence = $request->lieu_residence;
            $store_employe_info->nationalite = $request->nationalite;
            $store_employe_info->nombre_enfant_a_charge = $request->nombre_enfant_a_charge;
            $store_employe_info->type_piece = $request->type_piece;
            $store_employe_info->piece_number = $request->piece_number;

            if($this->employe_photo != "file_not_found"):
                $store_employe_info->photo = $this->employe_photo;
            endif;

            $store_employe_info->slug = CodeGenerator::generateSlugCode();


            if($store_employe_info->save()):

                // $notifiction = "Bonjour cher.". " " .$store_employe_info->first_name ." bienvenue à l'Office Ivoirien de la Propriété Intellectuelle (OIPI) " ;
                // Mail::to($store_employe_info->email)->send(new Notifications($notifiction));
                
                // Mail::to($destinataire_data->adresse_email)
                // ->cc('david.youant@alerte-info.net')
                // ->send(new DemandeMailer($notifications,$destinataire_data, $subject));

                return response()->json(
                    [
                        'status' => 'succès',
                        'code' => 200,
                        'message' => "Ok ! Vos informations ont été enregistrées avec succès. Vous recevrez vos accès par mail après l'activation de votre compte."
                    ]
                );
            else:
                return response()->json(
                    [
                        'status' => 'erreur',
                        'code' => 300,
                        'message' => "Erreur ! Échec de l'enregistrement de vos informations, veuillez réessayer!"
                    ]
                );
            endif;



        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 300,
                    'message' => $e->getCode(),
                ]
            );
        }
    }
}
