<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePivotHikeTrailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hike_trail', function (Blueprint $table) {
            // When a hike is deleted from the hikes table,
            // then also drop all rows with matching hike_id from hike_trails
            $table->integer('hike_id')->unsigned()->index();
            $table->foreign('hike_id')->references('id')->on('hikes')->onDelete('cascade');
            // When a trail is deleted from the trails table,
            // then also drop all rows with matching trail_id from hike_trails
            $table->integer('trail_id')->unsigned()->index();
            $table->foreign('trail_id')->references('id')->on('trails')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hike_trail');
    }
}
