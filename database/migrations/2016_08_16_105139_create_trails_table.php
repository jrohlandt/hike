<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trails', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description');
            $table->integer('severity_id')->default(0)->unsigned();
            $table->integer('exposure_id')->default(0)->unsigned();
            $table->string('distance')->default(0);
            $table->string('elevation_min')->default(0);
            $table->string('elevation_max')->default(0);
            $table->string('elevation_gain')->default(0);
            $table->string('latitude_start')->default(0);
            $table->string('longitude_start')->default(0);
            $table->string('latitude_end')->default(0);
            $table->string('longitude_end')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('trails');
    }
}
