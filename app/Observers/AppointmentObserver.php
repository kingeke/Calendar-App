<?php

namespace App\Observers;

use App\Appointment;
use Illuminate\Support\Str;

class AppointmentObserver
{
    /**
     * Handle the appointment "creating" event.
     *
     * @param  \App\Appointment  $appointment
     * @return void
     */
    public function creating(Appointment $appointment)
    {
        $uuid = Str::uuid()->toString();

        while (Appointment::where('uuid', $uuid)->exists()) {
            $uuid = Str::uuid()->toString();
        }

        $appointment->uuid = $uuid;
    }
}
