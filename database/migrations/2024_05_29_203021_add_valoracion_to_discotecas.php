<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('discotecas', function (Blueprint $table) {
            $table->integer('total_valoraciones')->default(0);
            $table->integer('num_valoraciones')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('discotecas', function (Blueprint $table) {
            $table->dropColumn(['total_valoraciones', 'num_valoraciones']);
        });
    }
};
