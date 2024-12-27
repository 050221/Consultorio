<?php

namespace App\Console\Commands;

use App\Models\Citas;
use Carbon\Carbon;
use Illuminate\Console\Command;

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
    protected $description = 'Enviar recordatorios de cita a los pacientes';

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
            $patient = $appointment->users; // Asegúrate de tener una relación `user` en el modelo Appointment
            $patient->notify(new \App\Notifications\AppointmentReminder($appointment));
        }

        $this->info('Recordatorios enviados con éxito.');
    }
}
