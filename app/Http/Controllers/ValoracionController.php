<?php

namespace App\Http\Controllers;

use App\Models\Discoteca;
use App\Models\Valoracion;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    public function store(Request $request, Discoteca $discoteca, $valorationNumber)
    {
        $user = $request->user();

        $valoracion = Valoracion::firstOrNew([
            'user_id' => $user->id,
            'discoteca_id' => $discoteca->id
        ]);

        $nuevaValoracion = $valorationNumber;

        if ($valoracion->exists) {
            // Si la valoración existe, la actualizamos
            // Restar del los totales de la discoteca la valoracion antigua
            $discoteca->total_valoraciones -= $valoracion->valoracion;
        } else {
            // Si es una nueva valoración, aumentamos el numero de valoraciones
            $discoteca->num_valoraciones += 1;
        }

        // Actualizar la valoración y guardarla
        $valoracion->valoracion = $nuevaValoracion;
        $valoracion->save();

        // Actualizamos total_valoraciones en los datos de la discoteca
        $discoteca->total_valoraciones += $nuevaValoracion;
        $discoteca->save();

        // Responde con un mensaje de éxito
        return response()->json($discoteca->total_valoraciones/ $discoteca->num_valoraciones);
    }

    public function getUserRating(Request $request, $bolicheId)
    {
        $user = $request->user();

        $valoracion = Valoracion::where('user_id', $user->id)
                                ->where('discoteca_id', $bolicheId)
                                ->first();

        // Si existe una calificación del usuario, retorna la calificación
        if ($valoracion) {
            return response()->json($valoracion->valoracion);
        }
        
        // Si no existe una calificación, retorna null 
        else {
            return response()->json('No se encontró la calificación.', 404);
        }
    }
}
