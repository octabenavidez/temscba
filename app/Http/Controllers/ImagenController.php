<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImagenRequest;
use App\Models\Discoteca;
use App\Models\ImagenDiscoteca;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
// use Intervention\Image\ImageManager;
// use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Facades\Image;


class ImagenController extends Controller
{
    public function store(StoreImagenRequest $request)
    {
        $data = $request->validated();
        
        $discoteca = Discoteca::findOrFail($data['discoteca_id']);

        $imageData = [];
        if($files = $request->file('imagen')){
            foreach($files as $file){
                $extension = $file->getClientOriginalExtension();
                $filename = uniqid() . '.' . $extension;
                
                // Redimensionar y comprimir la imagen
                $image = Image::make($file);
                $image->resize(300, 200); // Redimensiona la imagen a 300x200 pixels

                // Obtenemos el contenido de la imagen
                $imageContent = (string) $image->encode();

                // Guarda la imagen modificada en su lugar
                Storage::disk('img_boliches')->put($filename, $imageContent);

                $imageData[] = [
                    'discoteca_id' => $discoteca->id,
                    'imagen' => $filename
                ];
            }
        }        

        $imagen = ImagenDiscoteca::insert( $imageData );

        return response()->json($imagen);
    }

    public function destroy($id)
    {
        $imagenBoliche = ImagenDiscoteca::findOrFail($id);

        $url = Storage::disk('img_boliches')->path($imagenBoliche->imagen);

        // Elimina la imagen del servidor
        if (File::exists($url)) {
            // Elimina la imagen del servidor
            File::delete($url);
        }

        // Elimina la imagen de la base de datos
        $imagenBoliche->delete();

        return response()->json(null, 204);
    }
}
