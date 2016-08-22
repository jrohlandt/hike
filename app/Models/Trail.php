<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trail extends Model
{
    use SoftDeletes;

    protected $fillable = [
    	'name',
    	'severity',
    	'exposure',
    	'description',
    	'distance',
    	'elevation_min',
    	'elevation_max',
    	'elevation_gain',
    	'coordinate_start',
    	'coordinate_end',
    	];

    protected $dates = ['deleted_at'];

    public function hikes()
    {
        return $this->belongsToMany('App\Models\Hike');
    }

    public function severities()
    {
        return $this->hasOne('App\Models\Severity');
    }
}
