<?php

Route::group(['prefix' => 'appointment'], function () {

    Route::post('/create', 'AppointmentController@create');

    Route::get('/{uuid}', 'AppointmentController@view');

    Route::put('/{uuid}', 'AppointmentController@update');

    Route::delete('/{uuid}', 'AppointmentController@destroy');
});

Route::get('/appointments', 'AppointmentController@index');

Route::post('/appointments', 'AppointmentController@import');
