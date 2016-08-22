<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hike extends Model
{
    use SoftDeletes;

    protected $fillable = [
    	'title',
    	'severity_id',
    	'exposure_id',
    	'description',
    	'distance',
    	'elevation_min',
    	'elevation_max',
    	'elevation_gain',
    	'coordinate_start',
    	'coordinate_end',
        'slug',
    	];

    protected $dates = ['deleted_at'];

    public function trails()
    {
        return $this->belongsToMany('App\Models\Trail');
    }
    
}
