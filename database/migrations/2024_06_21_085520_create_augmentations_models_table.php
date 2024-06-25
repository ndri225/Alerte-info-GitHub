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
        Schema::create('augmentations_models', function (Blueprint $table) {
            $table->id();
            $table->string('employe_matricule')->nullable();
            // $table->string('augmentation_motif')->nullable();
            $table->string('somme')->nullable();
            $table->date('date_augments')->nullable();
            $table->string('slug')->nullable();
            $table->timestamps();
    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('augmentations_models');
    }
};
