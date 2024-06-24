<?php

namespace App\Http\Controllers\API\V1\RessourceHumaine;
use App\Mail\DemandeMailer;
use Illuminate\Http\Request;
use App\Mail\SendAccountMailer;
use App\Services\CodeGenerator;
use App\Services\UploadService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Models\RessourceHumaine\MissionModels;

class MissionController extends Controller
{
 
    public $permission_file;


    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }



    public function get_all_mission() {

        try {
            return DB::table('mission_models')
            ->join('employe_information_models', 'mission_models.employe_matricule', '=', 'employe_information_models.matricule')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
                'mission_models.*'
            )
            ->orderBy('mission_models.created_at', 'asc')
            ->get();


        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 300,
                    'message' => $e->getMessage(),
                ]
            );
        }
    }

    // public function index($employe_matricule) {

    //     try {
    //         $mission =  DB::table('employe_contrat_models')
    //         ->join('employe_information_models', 'employe_contrat_models.employe_matricule', '=', 'employe_information_models.matricule')
    //         ->join('permissions_models', 'employe_contrat_models.employe_matricule', '=', 'permissions_models.employe_matricule')
    //         ->join('fonction_models', 'employe_contrat_models.fonction_id', '=', 'fonction_models.id')
    //         ->join('service_models', 'employe_contrat_models.service_id', '=', 'service_models.id')
    //         ->join('bureau_models', 'employe_contrat_models.bureau_id', '=', 'bureau_models.id')
    //         ->select(
    //             'employe_information_models.first_name',
    //             'employe_information_models.last_name',
    //             'fonction_models.fonction',
    //             'service_models.service',
    //             'bureau_models.bureau',
    //             'permissions_models.*'
    //         )->orderBy('permissions_models.new_actions', 'asc')
    //         ->get();

    //         $customer_mission =  DB::table('employe_contrat_models')
    //         ->join('employe_information_models', 'employe_contrat_models.employe_matricule', '=', 'employe_information_models.matricule')
    //         ->join('permissions_models', 'employe_contrat_models.employe_matricule', '=', 'permissions_models.employe_matricule')
    //         ->join('fonction_models', 'employe_contrat_models.fonction_id', '=', 'fonction_models.id')
    //         ->join('service_models', 'employe_contrat_models.service_id', '=', 'service_models.id')
    //         ->join('bureau_models', 'employe_contrat_models.bureau_id', '=', 'bureau_models.id')
    //         ->select(
    //             'employe_information_models.first_name',
    //             'employe_information_models.last_name',
    //             'fonction_models.fonction',
    //             'service_models.service',
    //             'bureau_models.bureau',
    //             'permissions_models.*'
    //         )->orderBy('permissions_models.new_actions', 'asc')
    //         ->where('permissions_models.employe_matricule', $employe_matricule)
    //         ->get();

    //         return [
    //             'mission' => $mission,
    //             'customer_mission' => $customer_mission
    //         ];
    //     } catch (\Throwable $e) {
    //         return response()->json(
    //             [
    //                 'status' => 'error',
    //                 'code' => 300,
    //                 'message' => $e->getMessage(),
    //             ]
    //         );
    //     }
    // }

    public function customers_missions($employe_matricule) {

        try {

            return  DB::table('mission_models')->get();
            

        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'code' => 300,
                    'message' => $e->getMessage(),
                ]
            );
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //return $request->all();
        try {
            if (empty($request->description)) :
                return response()->json(
                    [
                        'code' => "302",
                        'message' => "Le motif de la mission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->lieu_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "Le lieu de la mission est obligatoire 🤐"
                    ]
                );
            endif;
            
            if (empty($request->mission_start)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date de début de la mission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->mission_end)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date de fin de la mission est obligatoire 🤐"
                    ]
                );
            endif;

           
            if (empty($request->duree_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La durée de la permission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->duree_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La durée de la permission est obligatoire 🤐"
                    ]
                );
            endif;
         
                 
            $add_mission = new MissionModels();

            $add_mission->mission_ref = CodeGenerator::generateMissionCode();

            $add_mission->description = $request->description;
            $add_mission->mission_start = $request->mission_start;
            $add_mission->mission_end = $request->mission_end;
            $add_mission->lieu_mission = $request->lieu_mission;
            $add_mission->employe_matricule = $request->employe_matricule;
            $add_mission->duree_mission = $request->duree_mission;
            $add_mission->slug = CodeGenerator::generateSlugCode();

            if($add_mission->save()) :
                return response()->json(
                    [
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Ok!, La mission a été enregistrée avec succès'
                    ]
                );
            else:
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 300,
                        'message' => "Erreur ! Échec de l'enregistrement de la mission, veuillez réessayer!"
                    ]
                );
            endif;

        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'code' => 300,
                    'message' => $e->getMessage(),
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */

    public function edit($slug) {

        try {
            return DB::table('mission_models')
            ->join('employe_information_models', 'mission_models.employe_matricule', '=', 'employe_information_models.matricule')
            // ->join('fonction_models', 'mission_models.fonction_id', '=', 'fonction_models.id')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
                // 'fonction_models.fonction',
                'mission_models.*'
            )
            ->where('mission_models.slug', $slug)
            ->first();
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 300,
                    'message' => $e->getMessage(),
                ]
            );
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        //return $request->all();

        try {
            if (empty($request->description)) :
                return response()->json(
                    [
                        'code' => "302",
                        'message' => "Le motif de la mission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->lieu_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "Le lieu de la mission est obligatoire 🤐"
                    ]
                );
            endif;
            
            if (empty($request->mission_start)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date de début de la mission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->mission_end)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date de fin de la mission est obligatoire 🤐"
                    ]
                );
            endif;

           
            if (empty($request->duree_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La durée de la permission est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->duree_mission)):
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La durée de la permission est obligatoire 🤐"
                    ]
                );
            endif;

          

            $update_mission = MissionModels::where('slug', $slug)->first();

            $update_mission->description = $request->description;
            $update_mission->mission_start = $request->mission_start;
            $update_mission->mission_end = $request->mission_end;
            $update_mission->lieu_mission = $request->lieu_mission;
            $update_mission->employe_matricule = $request->employe_matricule;
            $update_mission->destinataire = $request->destinataire;
            $update_mission->duree_mission = $request->duree_mission;

            if($update_mission->save()) :
                return response()->json(
                    [
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Ok!, La mission a été modifiée avec succès'
                    ]
                );
            else:
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 300,
                        'message' => "Erreur ! Échec de la modification de la mission, veuillez réessayer!"
                    ]
                );
            endif;
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'code' => 300,
                    'message' => $e->getMessage(),
                ]
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        try {
            if (!$slug) :
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 404,
                        'message' => "Erreur!, Aucun element trouvé"
                    ]
                );
            else :

                DB::table('mission_models')->where('slug', $slug)->delete();
                return response()->json(
                    [
                        'status' => 'succès',
                        'code' => 200,
                        'message' => "Ok!, Suppression éffectuée"
                    ]
                );

            endif;
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 302,
                    'message' => $e->getMessage()
                ]
            );
        }
    }



    public function approved_or_rejected_mission(Request $request) {

        //return $request->all();
        try {
            if (empty($request->decison)):
                return response()->json(
                    [
                        'status' => 'erreur',
                        'code' => 302,
                        'message' => "Erreur!, La décision est obligatoire"
                    ]
                );
            else :

                $check_approuved_data = DB::table('mission_models')->where('slug', $request->slug)
                ->select('status_on','status_off', 'employe_matricule')
                ->first();

                if($request->decison == "approved"):
                    if($check_approuved_data->status_on == 0):
                        DB::table('mission_models')->where('slug', $request->slug)->update([
                            'status_on' => 1,
                            'comments' => $request->decision_comments
                        ]);

                        //$user_email = DB::table('users')->where('id', $check_approuved_data->customer_id)->value('email');

                        //Mail::to($store_administration_compte->email)->send(new SendAccountMailer($request->password,$store_administration_compte, $request->email));
                        return response()->json(
                            [
                                'status' => 'succès',
                                'code' => 200,
                                'message' => "Ok!, mission approuvée avec succès"
                            ]
                        );
                    else:
                        return response()->json(
                            [
                                'status' => 'error',
                                'code' => 404,
                                'message' => "Erreur!, mission déjà approuvée"
                            ]
                        );
                    endif;
                elseif($request->decison == "rejected"):

                    if($check_approuved_data->status_off == 0):
                        DB::table('mission_models')->where('slug', $request->slug)->update([
                            'status_off' => 1,
                            'comments' => $request->decision_comments
                        ]);


                        //$user_email = DB::table('users')->where('id', $check_approuved_data->customer_id)->value('email');

                        //Mail::to($store_administration_compte->email)->send(new SendAccountMailer($request->password,$store_administration_compte, $request->email));

                        return response()->json(
                            [
                                'status' => 'succès',
                                'code' => 200,
                                'message' => "Ok!, mission rejetée avec succès"
                            ]
                        );
                    else:
                        return response()->json(
                            [
                                'status' => 'error',
                                'code' => 404,
                                'message' => "Erreur!, mission déjà rejetée"
                            ]
                        );
                    endif;
                endif;
            endif;
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 302,
                    'message' => $e->getMessage()
                ]
            );
        }

    }

    public function consulted_mission($slug) {

        try {
            if (!$slug) :
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 404,
                        'message' => "Erreur!, Aucun element trouvé"
                    ]
                );
            else :

                $check_approuved_data = DB::table('mission_models')->where('slug', $slug)->value('new_actions');

                if($check_approuved_data == 0):

                    $is_success = DB::table('mission_models')->where('slug', $slug)->update(['new_actions' => 1]);

                    if($is_success):
                        return response()->json(
                            [
                                'status' => 'succès',
                                'code' => 200,
                                'message' => "Ok!, Vous venez de consulter la Mission"
                            ]
                        );
                    else:
                        return response()->json(
                            [
                                'status' => 'erreur',
                                'code' => 302,
                                'message' => "Oups ! L'activiation du statut de la consultation a échouée"
                            ]
                        );
                    endif;

                elseif($check_approuved_data == 1):
                    return response()->json(
                        [
                            'status' => 'succès',
                            'code' => 201,
                            'message' => "Ok!, Mission déjà consultée"
                        ]
                    );
                endif;


            endif;
        } catch (\Throwable $e) {
            return response()->json(
                [
                    'status' => 'erreur',
                    'code' => 302,
                    'message' => $e->getMessage()
                ]
            );
        }

    }
}
