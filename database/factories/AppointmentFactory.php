<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Appointment;
use App\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Appointment::class, function (Faker $faker) {

    $date = $faker->dateTimeThisMonth();

    return [
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'title' => $faker->word,
        'description' => $faker->paragraph,
        'start' => Carbon::parse($date)->startOfDay()->addMonth(1)->addHour(9)->toDateTimeString(),
        'end' => Carbon::parse($date)->startOfDay()->addMonth(1)->addHour(11)->toDateTimeString(),
    ];
});
