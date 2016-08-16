<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hikes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->integer('severity_id')->nullable()->unsigned();
            $table->integer('exposure_id')->nullable()->unsigned();
            $table->string('distance')->nullable();
            $table->string('elevation_min')->nullable();
            $table->string('elevation_max')->nullable();
            $table->string('elevation_gain')->nullable();
            $table->string('coordinate_start')->nullable();
            $table->string('coordinate_end')->nullable();
            $table->string('slug');
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
        Schema::drop('hikes');
    }
}
