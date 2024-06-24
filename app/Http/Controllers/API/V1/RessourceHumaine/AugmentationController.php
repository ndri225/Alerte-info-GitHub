<?php


namespace App\Http\Controllers\API\V1\RessourceHumaine;
use App\Mail\DemandeMailer;
use Illuminate\Http\Request;
use App\Services\CodeGenerator;
use App\Services\UploadService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Models\RessourceHumaine\PermissionsModels;
use App\Models\RessourceHumaine\AugmentationsModels;

class AugmentationController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    

    public function get_all_augmentation() {

        try {
            return DB::table('augmentations_models')
            ->join('employe_information_models', 'augmentations_models.employe_matricule', '=', 'employe_information_models.matricule')
           ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
               
                'augmentations_models.*'
            )
            ->orderBy('augmentations_models.somme', 'asc')
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

    public function index($employe_matricule) {

        try {
            $augmentation =  DB::table('augmentations_models')
            ->join('employe_information_models', 'augmentations_models.employe_matricule', '=', 'employe_information_models.matricule')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
               
                'augmentations_models.*'
            )
            ->orderBy('augmentations_models.somme', 'asc')
            ->get();
          

            $customer_augmentation =  DB::table('augmentations_models')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
               
                'augmentations_models.*'
            )
            ->orderBy('augmentations_models.somme', 'asc')
            ->where('augmentations_models.employe_matricule', $employe_matricule)
            ->get();

            return [
                'permission' => $augmentation,
                'customer_augmentation' => $customer_augmentation
            ];
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

    public function customers_augmentation($employe_matricule) {

        try {

            return  DB::table('augmentations_models')
            ->join('employe_information_models', 'augmentations_models.employe_matricule', '=', 'employe_information_models.matricule')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
               
                'augmentations_models.*'
            )
            ->orderBy('augmentations_models.somme', 'asc')
           
            ->where('augmentations_models.employe_matricule', $employe_matricule)
            ->get();


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
            if (empty($request->augmentation_motif)) :
                return response()->json(
                    [
                        'code' => "302",
                        'message' => "Le motif de l'augmentation est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->date_augmentation)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->somme)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La somme a augmenter est obligatoire 🤐"
                    ]
                );
            endif;


            $add_augmentation = new AugmentationsModels();

            $add_augmentation->augmentation_ref = CodeGenerator::generateAugmentationCode();

            $add_augmentation->augmentation_motif = $request->augmentation_motif;
            $add_augmentation->somme = $request->somme;
            $add_augmentation->date_augments = $request->date_augments;

            $add_augmentation->slug = CodeGenerator::generateSlugCode();

            if($add_augmentation->save()):
                return response()->json(
                    [
                        'status' => 'succès',
                        'code' => 200,
                        'message' => "Ok!, L'employé a été augmenter avec succès"
                    ]
                );
            else:
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 300,
                        'message' => "Erreur ! Échec de l'augmentation du salaire, veuillez réessayer!"
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
            return DB::table('augmentations_models')
            ->join('employe_information_models', 'augmentations_models.employe_matricule', '=', 'employe_information_models.matricule')
            ->select(
                'employe_information_models.first_name',
                'employe_information_models.last_name',
               
                'augmentations_models.*'
            )
            ->orderBy('augmentations_models.somme', 'asc')
            
            ->where('augmentations_models.slug', $slug)
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

            if (empty($request->augmentation_motif)) :
                return response()->json(
                    [
                        'code' => "302",
                        'message' => "Le motif de l'augmentation est obligatoire 🤐"
                    ]
                );
            endif;

            if (empty($request->date_augments)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La date est obligatoire 🤐"
                    ]
                );
            endif;

         
          
            if (empty($request->somme)) :
                return response()->json(
                    [
                        'code' => 302,
                        'message' => "La somme a augmenter est obligatoire 🤐"
                    ]
                );
            endif;



            $update_augmentation = AugmentationsModels::where('slug', $slug)->first();

            $update_augmentation->augmentation_ref = CodeGenerator::generateAugmentationCode();

            $update_augmentation->augmentation_motif = $request->augmentation_motif;
            $update_augmentation->somme = $request->somme;
            $update_augmentation->date_augments = $request->date_augments;

            $update_augmentation->slug = CodeGenerator::generateSlugCode();

            if($update_augmentation->save()) :
                return response()->json(
                    [
                        'status' => 'succès',
                        'code' => 200,
                        'message' => 'Ok!, Le site a été enregistré avec succès'
                    ]
                );
            else:
                return response()->json(
                    [
                        'status' => 'error',
                        'code' => 300,
                        'message' => "Erreur ! Échec de l'enregistrement du site, veuillez réessayer!"
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

                DB::table('augmentations_models')->where('slug', $slug)->delete();
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

}
