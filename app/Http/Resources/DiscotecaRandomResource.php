<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscotecaRandomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'id' => $this->id,
            'nombre' => $this->nombre, 
            'descripcion' => $this->descripcion,
            'imagenes_boliche' => ImagenDiscotecaResource::collection($this->whenLoaded('imagenesDiscotecas')),
        ];
    }
}