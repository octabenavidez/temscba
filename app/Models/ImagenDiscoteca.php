<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenDiscoteca extends Model
{
    use HasFactory;
    protected $fillable = ['imagen', 'discoteca_id'];

    protected $table = 'imagenes_discotecas';

    public function discoteca()
    {
        return $this->belongsTo(Discoteca::class);
    }
}
