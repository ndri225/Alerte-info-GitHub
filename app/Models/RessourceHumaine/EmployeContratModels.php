<?php

namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeContratModels extends Model
{
    use HasFactory;

    protected $fileable = [
        'employe_matricule',
        'fonction_id',
        'service_id',
        'categorie_pro_id',
        'bureau_id',
        'contrats_id',
        'cnps_number',
        'date_embauche',
        'date_embauche_end',
        'salaire_categoriel',
        'salaire_mensuel_net',
        'status_contrats',
        'garde_employe',
        'slug',
    ];
}
