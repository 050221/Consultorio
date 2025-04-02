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
        Schema::create('citas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade'); // Relación con doctores
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade'); // Relación con pacientes
            $table->date('fecha');
            $table->time('hora');
            $table->json('servicio');
            $table->string('status')->default('Pendiente');
            $table->longText('nota')->nullable();
            $table->boolean('is_emergency')->default(false); // Si es urgencia o no
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
