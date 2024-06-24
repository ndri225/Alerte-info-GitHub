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
        Schema::create('permissions_models', function (Blueprint $table) {
            $table->id();
            $table->string('permission_ref')->nullable();
            $table->string('employe_matricule')->nullable();
            $table->string('destinataire')->nullable();
            $table->string('type_conge')->nullable();
            $table->string('objet_demande')->nullable();
            $table->string('motif')->nullable();
            $table->string('permission_file')->nullable();
            $table->string('duree_permission')->nullable();
            $table->string('permission_start')->nullable();
            $table->string('permission_end')->nullable();
            $table->date('date_permission')->nullable();
            $table->string('type_duration')->nullable();
            $table->boolean('new_actions')->default(false);
            $table->boolean('admin_new_actions')->default(false);
            $table->boolean('responsable_new_actions')->default(false);
            $table->text('decision_responsable')->nullable();
            $table->text('comments')->nullable();
            $table->boolean('status_on')->default(false);
            $table->boolean('status_off')->default(false);
            $table->string('slug')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions_models');
    }
};
