<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDiscotecaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255', 
            'precio' => 'required|numeric', 
            'tipo' => 'required|string', 
            'descripcion' => 'required|string|max:1000',
            'capacidad' => 'required|integer|min:1', 
            'horario' => 'required|string', 
            'direccion' => 'required|string|max:255', 
            'facebook' => 'required|url', 
            'instagram' => 'required|url', 
            'link_compra' => 'required|url', // el enlace de compra debe ser una URL válida
            'google_maps_iframe_src' => 'required|string',
        ];
    }
}
