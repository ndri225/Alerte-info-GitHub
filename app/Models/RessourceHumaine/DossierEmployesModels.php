<?php

namespace App\Models\RessourceHumaine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DossierEmployesModels extends Model
{
    use HasFactory;

    protected $fileable = [
        'dossiers_code',
        'libelle_dossiers',
        'author_dossiers',
        'status_folder', 'slug'];
}
