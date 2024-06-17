<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;

    protected $table = 'valoraciones';

    protected $fillable = [
        'user_id',
        'discoteca_id',
        'valoracion'
    ];

    public function discoteca()
    {
        return $this->belongsTo(Discoteca::class);
    }
}
