<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscotecaResource extends JsonResource
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
            'precio' => $this->precio, 
            'tipo' => $this->tipo, 
            'descripcion' => $this->descripcion,
            'capacidad' => $this->capacidad, 
            'horario' => $this->horario, 
            'direccion' => $this->direccion, 
            'facebook' => $this->facebook, 
            'instagram' => $this->instagram, 
            'link_compra' => $this->link_compra, // el enlace de compra debe ser una URL válida
            'google_maps_iframe_src' => $this->google_maps_iframe_src,
            'total_valoraciones' => $this->total_valoraciones,
            'num_valoraciones' => $this->num_valoraciones,
            'imagenes_boliche' => ImagenDiscotecaResource::collection($this->whenLoaded('imagenesDiscotecas')),
            
        ];
    }
}
