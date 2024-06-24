<?php
namespace App\Models\RessourceHumaine;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionModels extends Model
{
    use HasFactory;
    protected $fileable = [
        
        'mission_ref',
        'employe_matricule',
        'lieu_mission',
        'description',
        'duree_mission',
        'mission_start',
        'mission_end',
        'decision_rh',
        'decision_dg',
        'slug',
    ];

}
