<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command("app:move-expired-appointments")
    ->hourly()
    ->appendOutputTo(storage_path("logs/scheduler.log"));
    //Objetivo: Mover las citas que ya pasaron a un estado de "expirado".
    //Frecuencia recomendada: Cada hora (por si hay citas que expiran en diferentes momentos del día).


Schedule::command("app:send-appointment-reminders")
    ->dailyAt('08:00')
    ->appendOutputTo(storage_path("logs/scheduler.log"));
    //Dado que los recordatorios siempre son para el día siguiente, no es necesario ejecutarlo muchas veces al día. La mejor opción sería una vez al día en la mañana, cuando los pacientes comienzan a revisar sus mensajes: 8:00 a.m.