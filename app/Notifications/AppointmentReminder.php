<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentReminder extends Notification
{
    use Queueable;


    private $appointment;
    /**
     * Create a new notification instance.
     */
    public function __construct($appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Formateo de fecha y hora
        $formattedDate = \Carbon\Carbon::parse($this->appointment->fecha)->locale('es')->isoFormat('dddd, D [de] MMMM [de] YYYY');
        $formattedTime = \Carbon\Carbon::parse($this->appointment->hora)->format('h:i A');

        return (new MailMessage)
            ->subject('¡Tu cita dental es pronto! 🦷')
            ->greeting('Hola, ' . ucfirst($notifiable->name) . ' 👋')
            ->line('Estamos emocionados de verte en tu próxima cita. Aquí están los detalles:')
            ->line('🗓️ **Fecha:** ' . ucfirst($formattedDate))
            ->line('⏰ **Hora:** ' . $formattedTime)
            ->line('Por favor, llega 10 minutos antes de tu cita para evitar inconvenientes.')
            ->action('Gestionar mi cita', url('/cita/' . $this->appointment->id))
            ->line('Gracias por confiar en nuestra clínica dental.')
            ->line('🦷 ¡Tu salud dental es nuestra prioridad!')
            ->salutation('Saludos cordiales, Equipo de [Nombre de la Clínica]');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
