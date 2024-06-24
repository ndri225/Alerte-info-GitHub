<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('default_employe_info_models', function (Blueprint $table) {
            $table->id();
            $table->string('employe_code', 50);
            $table->string('matricule', 50);
            $table->string('code_autorisation', 50);
            $table->string('code_owners', 100);
            $table->string('adresse_email', 100)->nullable();
            $table->string('diplome', 100)->nullable();
            $table->string('first_name', 100)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->date('date_naissance');
            $table->string('lieu_naissance', 100);
            $table->string('photo')->nullable();
            $table->string('phone')->nullable();
            $table->string('genre', 50)->nullable();
            $table->string('situation_matrimoniale')->nullable();
            $table->string('lieu_residence');
            $table->string('personne_a_contacter');
            $table->string('contact_personne_a_contacter');
            $table->string('nationalite')->nullable();
            $table->string('conjoint_name')->nullable();
            $table->string('contact_conjoint')->nullable();
            $table->integer('nombre_enfant_a_charge')->default(0);
            $table->string('type_piece');
            $table->string('antecedent_medical');
            $table->string('personne_a_charge');
            $table->string('piece_number');
            $table->string('cnps_number')->nullable();
            $table->boolean('is_responsible')->default(0);
            $table->boolean('status')->default(0);
            $table->string('slug')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_employe_info_models');
    }
};
