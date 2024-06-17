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
            $table->text('google_maps_iframe_src')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('discotecas', function (Blueprint $table) {
            $table->dropColumn('google_maps_iframe_src');
        });
    }
};
