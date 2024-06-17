<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Resources\UserResource;
use App\Mail\HelloMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['nombre'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'points' => 100,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registered successfully',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->isAdmin
            ],
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function login(LoginRequest $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json([
                'message' => 'El email o el password es incorrecto'
            ], 422);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'message' => 'Login successfully',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->isAdmin
            ],
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function forgetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if($user){
            // Busca un token existente
            $existingToken = DB::table('password_reset_tokens')
                                ->where('email', $user->email)
                                ->first();

            // Si ya hay un token existente, retorna un mensaje de error
            if ($existingToken) {
                return response()->json(["error" => "Ya se ha enviado un correo para restablecer la contraseña."], 400);
            }

            $token = Str::random(64);
            DB::table('password_reset_tokens')->insert([
                'email' => $user->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);


            $url = "http://localhost:3000/reset-password?token={$token}";
                
            Mail::to($user->email)->send(new HelloMail($url));
        } else {
            return response()->json(["error" => "No se encontró un usuario con ese correo electrónico."], 404);
        }
    }

    public function resetPassword(Request $request)
    {
        // Aquí se convierte el token a su versión encriptada antes de buscarlo en la base de datos
        $tokenData = DB::table('password_reset_tokens')->where('token', $request->token)->first();

        if (!$tokenData) {
            return response()->json(['message' => 'Token inválido.'], 422);
        } 

        User::where('email', $tokenData->email)->update(['password' => bcrypt($request->password)]);

        DB::table('password_reset_tokens')->where('email', $tokenData->email)->delete();

        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function getUsers() 
    {
        return UserResource::collection(User::all());
    }

    public function logout()
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successfully'
        ]);
    }
}
