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
        Schema::create('mission_models', function (Blueprint $table) {
            $table->id();
            $table->string('mission_ref')->nullable();
            $table->string('employe_matricule')->nullable();
            $table->string('lieu_mission')->nullable();
            $table->string('description')->nullable();
            $table->string('duree_mission')->nullable();
            $table->date('mission_start')->nullable();
            $table->date('mission_end')->nullable();
            $table->boolean('decision_rh')->default(false);
            $table->boolean('decision_dg')->default(false);
            $table->string('slug')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_models');
    }
};
