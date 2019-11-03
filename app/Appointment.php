<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public $timestamps = false;

    protected $dates = ['start', 'end'];

    protected $hidden = ['id', 'user_id'];

    protected $fillable = ['title', 'description', 'start', 'end', 'completed'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function setStartAttribute($date)
    {
        $this->attributes['start'] = Carbon::parse($date)->toDateTimeString();
    }

    public function setEndAttribute($date)
    {
        $this->attributes['end'] = Carbon::parse($date)->toDateTimeString();
    }
}
