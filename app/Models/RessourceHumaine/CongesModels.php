<?php

namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongesModels extends Model
{
    use HasFactory;

    protected $fileable = [
        'conge_ref',
        'employe_matricule',
        'destinataire',
        'type_conge',
        'objet_demande',
        'motif',
        'duree_conge',
        'date_depart',
        'date_retour',
        'new_actions',
        'admin_new_actions',
        'responsable_new_actions',
        'decision_responsable',
        'comments',
        'status_on',
        'status_off',
        'slug'
    ];
}
