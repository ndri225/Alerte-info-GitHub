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
        Schema::create('employe_contrat_models', function (Blueprint $table) {
            $table->id();
            $table->integer('fonction_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->integer('categorie_pro_id')->unsigned();
            $table->integer('bureau_id')->unsigned();
            $table->integer('contrats_id')->unsigned();
            $table->string('employe_matricule', 50);
           
            $table->string('cnps_number')->nullable();
            $table->date('date_embauche')->nullable();
            $table->date('date_embauche_end', 100);
            $table->string('garde_employe', 100);
            $table->integer('salaire_categoriel')->default(0);
            $table->integer('salaire_mensuel_net')->default(0);
            $table->boolean('status_contrats')->default(0);
            $table->string('slug', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employe_contrat_models');
    }
};
