<?php

namespace App\Console\Commands;

use App\Models\Citas;
use App\Models\Historial_Citas;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MoveExpiredAppointments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:move-expired-appointments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mover citas pasadas a la tabla historial_citas';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now(); // Fecha actual

        // Obtener citas con fecha anterior a hoy
        $citasParaHistorial = Citas::where('status', ['confirmado', 'cancelado'])
        ->where('fecha', '<', now())
        ->get();

        foreach ($citasParaHistorial as $cita) {
            Historial_Citas::create([
                'patient_id' => $cita->patient_id,
                'fecha' => $cita->fecha,
                'hora' => $cita->hora,
                'nota' => $cita->nota,
                'status' => $cita->status
            ]);

            // Eliminar la cita original
            $cita->delete();
        }

        $this->info('Citas expiradas movidas al historial correctamente.');

    }
}
