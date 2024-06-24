<?php

namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionsModels extends Model
{
    use HasFactory;

    protected $fileable = [
        'permission_ref',
        'employe_matricule',
        'destinataire',
        'type_conge',
        'objet_demande',
        'motif',
        'duree_permission',
        'date_demande',
        'permission_start',
        'permission_end',
        'date_permission',
        'type_duration',
        'new_actions',
        'admin_new_actions',
        'responsable_new_actions',
        'permission_file',
        'decision_responsable',
        'status_on',
        'comments',
        'status_off',
        'slug',
    ];
}
