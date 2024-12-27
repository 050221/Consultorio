<?php

namespace App\Console\Commands;

use App\Models\Citas;
use App\Models\Historial_Citas;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

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
        $citasParaHistorial = Citas::whereIn('status', ['Confirmada', 'Cancelada'])
        ->where(function ($query) use ($now) {
            $query->where('fecha', '<', $now->toDateString())
                  ->orWhere(function ($query) use ($now) {
                      $query->where('fecha', '=', $now->toDateString())
                            ->where('hora', '<', $now->toTimeString());
                  });
        })
        ->get();

        foreach ($citasParaHistorial as $cita) {
            try {
                // Crear el registro en historial_citas
                Historial_Citas::create([
                    'patient_id' => $cita->patient_id,
                    'fecha' => $cita->fecha,
                    'hora' => $cita->hora,
                    'status' => $cita->status,
                    'nota' => $cita->nota,
                ]);

                // Eliminar la cita original
                $cita->delete();

            } catch (\Exception $e) {
                // Registrar errores en el log
                Log::error("Error al mover la cita al historial", [
                    'cita_id' => $cita->id ?? null,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $this->info('Citas expiradas movidas al historial correctamente.');
    }
}
