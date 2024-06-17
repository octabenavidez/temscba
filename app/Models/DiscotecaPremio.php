<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscotecaPremio extends Model
{
    use HasFactory;

    protected $table = 'discotecas_premios';
    
    protected $fillable = ['discoteca_id', 'premio_id'];
}
