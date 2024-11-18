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
            $table->foreignIdFor(\App\Models\User::class, 'patient_id');
            $table->foreignIdFor(\App\Models\User::class, 'doctor_id');
            $table->date('fecha');
            $table->time('hora');
            $table->string('status')->default('pending');
            $table->longText('nota')->nullable();
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
