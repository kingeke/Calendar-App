<?php

namespace App\Providers;

use App\Appointment;
use App\Observers\AppointmentObserver;
use App\Observers\UserObserver;
use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

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

        if (env("APP_VERCEL")) {

            \Illuminate\Support\Facades\URL::forceScheme('https');

            $dbPath = env('DB_DATABASE', database_path('database.sqlite'));

            if (!File::exists($dbPath)) {

                File::put($dbPath, '');

                Artisan::call("migrate");

                Artisan::call("db:seed");
            }
        }

        if (env('REDIRECT_HTTPS')) {
            $this->app['request']->server->set('HTTPS', true);
        }
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
    }
}
