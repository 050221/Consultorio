<?php

namespace App\Console\Commands;

use App\Models\Citas;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Notifications\AppointmentReminder;

class SendAppointmentReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-appointment-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envía recordatorios de citas a los pacientes con citas próximas';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tomorrow = Carbon::tomorrow()->toDateString();

        // Obtener citas programadas para mañana
        $appointments = Citas::where('fecha', $tomorrow)->get();

        foreach ($appointments as $appointment) {
            // Obtener el paciente correctamente
            $patient = $appointment->patient; // Usamos `patient` en vez de `users`

            // Verificar que el paciente exista antes de enviar la notificación
            if (!$patient) {
                $this->warn("Cita ID {$appointment->id} no tiene paciente asignado.");
                continue;
            }

            // Enviar la notificación
            $patient->notify(new AppointmentReminder($appointment));
        }

        $this->info('Recordatorios enviados con éxito a las ' . Carbon::now()->format('H:i:s'));
    }
}
