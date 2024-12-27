<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

    protected function schedule(Schedule $schedule): void
    {

        //se ejecurara todos los dias a las 3:00 AM  
        // comando para ejecutar  php artisan app:move-expired-appointments

        $schedule->command('app:move-expired-appointments')->dailyAt('03:00');
        $schedule->command('app:send-appointment-reminders')->dailyAt('08:00');
    }


    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

