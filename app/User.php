<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token', 'id'];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function appointments()
    {
        return $this->hasMany('App\Appointment');
    }

    /**
     * Ensure overlapping appointments cannot be created
     * 
     * @param Carbon\Carbon $start
     * 
     * @param Carbon\Carbon $end
     * 
     * @param App\Appointment $uuid
     * 
     * @return boolean
     */
    public function checkForOverlappingAppointments($start, $end, $uuid = null)
    {

        return $this->appointments()->where(function ($query) use ($start, $end, $uuid) {
            $query->where(function ($q) use ($start, $end, $uuid) {
                $q->where('start', '>=', $start)
                    ->where('start', '<', $end)
                    ->where('uuid', '!=', $uuid);
            })->orWhere(function ($q) use ($start, $end, $uuid) {
                $q->where('start', '<=', $start)
                    ->where('end', '>', $end)
                    ->where('uuid', '!=', $uuid);
            })->orWhere(function ($q) use ($start, $end, $uuid) {
                $q->where('end', '>', $start)
                    ->where('end', '<=', $end)
                    ->where('uuid', '!=', $uuid);
            })->orWhere(function ($q) use ($start, $end, $uuid) {
                $q->where('start', '>=', $start)
                    ->where('end', '<=', $end)
                    ->where('uuid', '!=', $uuid);
            });
        })->exists();
    }
}
