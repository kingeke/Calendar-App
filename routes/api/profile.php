<?php

Route::get('/', 'ProfileController@user');

Route::put('/update-profile', 'ProfileController@updateProfile');

Route::put('/change-password', 'ProfileController@changePassword');
