<?php


namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AugmentationsModels extends Model
{
    use HasFactory;
    protected $fileable = [
        'augmentation_ref',
        'employe_matricule',
        'augmentation_motif',
        'date_augments',
        'somme',
        'slug',
    ];
}
