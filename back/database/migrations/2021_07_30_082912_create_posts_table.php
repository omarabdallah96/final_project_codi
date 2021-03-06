<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->
            constrained('users')->
            onDelete('cascade');
            $table->string('cost');  
            $table->text('from_country');
            $table->text('to_country');
            $table->text('space');
            $table->date('post_date')->default((date("Y-m-d H:i:s")));


            $table->date('date_depart');
            $table->date('date_arrive');
            $table->text('note');
            $table->string('published')->default('published');


          




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
        Schema::dropIfExists('posts');
    }
}
