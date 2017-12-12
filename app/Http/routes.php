<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function() {
    Route::get('/dashboard', 'Admin\DashboardController@index');
    Route::resource('/hikes', 'Admin\HikesController');
    Route::resource('/trails', 'Admin\TrailsController');
    Route::resource('/peaks', 'Admin\PeaksController');
    Route::post('/peaks/uploadThumbnail/{peaks}', 'Admin\PeaksController@uploadThumbnail');
});
