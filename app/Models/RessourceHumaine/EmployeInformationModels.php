<?php

namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeInformationModels extends Model
{
    use HasFactory;

    protected $fileable = [

        'employe_code',
        'matricule',
        'first_name',
        'last_name',
        'adresse_email',
        'date_naissance',
        'lieu_naissance',
        'diplome',
        'photo',
        'phone',
        'genre',
        'situation_matrimoniale',
        'lieu_residence',
        'personne_a_contacter',
        'contact_personne_a_contacter',
        'conjoint_name',
        'contact_conjoint',
        'antecedent_medical',
        'personne_a_charge',

        'nationalite',
        'nombre_enfant_a_charge',
        'type_piece',
        'piece_number',
        'is_responsible',
        'status',
        'slug'
        
    ];
}
