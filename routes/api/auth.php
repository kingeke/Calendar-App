<?php

Route::post('/sign-up', 'AuthController@register');

Route::post('/login', 'AuthController@login');

Route::post('/log-out', 'AuthController@logOut');
