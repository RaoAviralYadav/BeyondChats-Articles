<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique()->nullable();
            $table->string('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('source_url')->nullable();
            $table->timestamp('scraped_at')->nullable();
            $table->json('references')->nullable(); // for later Phase 2 citations
            $table->json('updated_versions')->nullable(); // optional storage for updated versions
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
