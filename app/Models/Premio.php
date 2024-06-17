<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'puntos'
    ];

    public function discotecas()
    {
        return $this->belongsToMany(Discoteca::class, 'discotecas_premios');
    }

    public function rewardClaims()
    {
        return $this->hasMany(RewardClaim::class);
    }
}
