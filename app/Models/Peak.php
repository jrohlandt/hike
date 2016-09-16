<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Peak extends Model
{
    use SoftDeletes;

    protected $fillable = [
    	'name',
    	'exposure_id',
    	'description',
    	'elevation',
    	'latitude',
    	'longitude',
        'thumbnail'
    	];

    protected $dates = ['deleted_at'];

}
