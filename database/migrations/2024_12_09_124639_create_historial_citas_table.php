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
        Schema::create('historial_citas', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'doctor_id');
            $table->foreignIdFor(\App\Models\User::class, 'patient_id');
            $table->date('fecha')->index();
            $table->time('hora');
            $table->string('status')->index();
            $table->string('tipo');
            $table->longText('nota')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_citas');
    }
};
