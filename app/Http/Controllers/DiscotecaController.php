<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssociateRewardsRequest;
use App\Models\Discoteca;
use App\Http\Requests\StoreDiscotecaRequest;
use App\Http\Requests\UpdateDiscotecaRequest;
use App\Http\Resources\DiscotecaRandomResource;
use App\Http\Resources\DiscotecaResource;
use Illuminate\Support\Facades\Storage;

class DiscotecaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discotecas = Discoteca::with('imagenesDiscotecas')->get();

        return DiscotecaResource::collection($discotecas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiscotecaRequest $request)
    {
        $data = $request->validated();

        $discoteca = Discoteca::create($data);

        return response()->json($discoteca);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $discoteca = Discoteca::with('imagenesDiscotecas')->findOrFail($id);

         // Obtiene 3 boliches aleatorios que sean distintos al boliche actual
        $discotecasAleatorias = Discoteca::where('id', '!=', $id)->with('imagenesDiscotecas')->inRandomOrder()->take(3)->get();

        return [
            'discoteca' => new DiscotecaResource($discoteca),
            'discotecasAleatorias' => DiscotecaRandomResource::collection($discotecasAleatorias),
        ];
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDiscotecaRequest $request, Discoteca $discoteca)
    {
        $data = $request->validated();

        $discoteca->update($data);

        return response()->json($discoteca);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        // Encuentra el boliche por ID
        $boliche = Discoteca::find($id);

        foreach ($boliche->imagenesDiscotecas as $image) {
            // Elimina el archivo de la imagen del disco. Asegúrate de que $image->path sea la columna correcta.
            Storage::disk('img_boliches')->delete($image->imagen);

            // Elimina el registro de la imagen de la base de datos
            $image->delete();
        }

        // Finalmente, elimina el boliche
        $boliche->delete();

        // Devuelve una respuesta, por ejemplo, redirige al usuario a la lista de discotecas
        return response()->json(['id' => $boliche->id]);
    }

    public function associateRewards(AssociateRewardsRequest $request, Discoteca $discoteca) {
        $data = $request->validated();

        // Obtén la discoteca.
        $discoteca->premios()->sync($data['premios']);

        return response()->json([
            'message' => 'Premios asociados exitosamente',
        ], 200);
    }
}
