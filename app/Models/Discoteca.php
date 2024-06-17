<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discoteca extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'precio', 'tipo', 'descripcion', 'capacidad', 'horario', 'direccion', 'facebook', 'instagram', 'link_compra', 'google_maps_iframe_src'];

    public function imagenesDiscotecas()
    {
        return $this->hasMany(ImagenDiscoteca::class);
    }

    public function premios()
    {
        return $this->belongsToMany(Premio::class, 'discotecas_premios');
    }

    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class);
    }
}

