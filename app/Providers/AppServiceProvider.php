<?php

namespace App\Providers;

use App\Appointment;
use App\Observers\AppointmentObserver;
use App\Observers\UserObserver;
use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(UrlGenerator $url)
    {
        User::observe(UserObserver::class);
        Appointment::observe(AppointmentObserver::class);

        if (env('REDIRECT_HTTPS')) {
            $url->formatScheme('https');
        }
    }
}
