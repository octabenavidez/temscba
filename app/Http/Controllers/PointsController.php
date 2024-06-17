<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRewardRequest;
use App\Http\Requests\UpdateRewardRequest;
use App\Models\Premio;
use App\Models\RewardClaim;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class PointsController extends Controller
{
    public function getUserPoints(Request $request)
    {
        $user = $request->user();  // Aquí obtienes el usuario autenticado
        return response()->json([
            'points' => $user->points
        ]);
    }

    public function updateUserPoints(Request $request)
    {
        // Valida si el request tiene los campos necesarios
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'points' => 'required|integer',
        ]);

        // Busca el usuario por el correo electrónico
        $user = User::where('email', $request->email)->first();

        if ($user === null) {
            // Retorna un error si no se encuentra al usuario
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Actualiza los puntos del usuario y guarda
        $user->points = $request->points;
        $user->save();

        // Retorna una respuesta exitosa con los nuevos puntos
        return response()->json(['success' => 'Puntos actualizados exitosamente', 'points' => $user->points]);
    }

    public function showRelatedDiscotecas($id)
    {
        $premio = Premio::find($id);

        if(!$premio) {
            return response()->json([
                'message' => 'Premio no encontrado'
            ], 404);
        }

        $discotecas = $premio->discotecas;

        return response()->json([
            'discotecas' => $discotecas
        ]);
    }

    public function getUserRewardClaims(User $user)
    {
        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        // Obtener todas las recompensas reclamadas por el usuario
        $rewardClaims = $user->rewardClaims()->with('premio')->get();
        // Agregar la información del usuario a cada rewardClaim
        $rewardClaims->transform(function ($rewardClaim) use ($user) {
            $rewardClaim->user = $user;

            return $rewardClaim;
        });

        // Devolver las recompensas
        return response()->json($rewardClaims);
    }

    public function getRecentRewardClaims()
    {
        // calcula la fecha y hora de hace 24 horas
        $threeDaysAgo = Carbon::now()->subDays(3);

        // recupera los premios de las discotecas de las últimas 24 horas
        $recentPremios = RewardClaim::with(['user' => function($query) {
            $query->select('id', 'name', 'email'); // Seleciona unicamente id y nombre
        }, 'premio' => function($query) {
            $query->select('id', 'nombre'); // Seleciona unicamente id y nombre
        }])
        ->where('created_at', '>=', $threeDaysAgo)
        ->get();

        return response()->json($recentPremios);
    }

    public function getAllRewards()
    {
        return response()->json([
            'rewards' => Premio::all()
        ]);
    }

    public function claimReward(Request $request, $premioId)
    {
        $user = $request->user();

        // Encontrar el premio
        $premio = Premio::find($premioId);

        // El usuario tiene los puntos necesarios?
        if ($user->points >= $premio->puntos) {
            $user->points -= $premio->puntos;
            $user->save();

            // Generamos un código único
            $codigoUnico = 'RC-' . time() . '-' . $user->id;

            // Creamos un nuevo registro en reward_claims
            RewardClaim::create([
                'user_id' => $user->id,
                'premio_id' => $premioId,
                'claim_code' => $codigoUnico,
            ]);

            return response()->json([
                'message' => 'Premio Reclamado Correctamente',
                'remaining_points' => $user->points,
            ], 200);
        }

        // Si el usuario no tiene los puntos suficientes
        return response()->json([
            'message' => 'No tienes suficientes puntos para reclamar este premio, tienes ' . $user->points . ' puntos.',
        ], 400);
    }

    public function storeReward(StoreRewardRequest $request)
    {
        $data = $request->validated();

        $premio = Premio::create($data);
    
        return response()->json($premio);
    }

    public function updateReward(UpdateRewardRequest $request, Premio $premio)
    {
        $data = $request->validated();

        $premio->update($data);

    
        return response()->json($premio);
    }

    public function showReward(Premio $premio)
    {
        return response()->json($premio);
    }


    public function destroyReward(Premio $premio)
    {
        $premio->delete();

        return response()->json(['id' => $premio->id]);
    }

}