<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'email|unique:users,email|nullable',
            'is_admin' => 'bool',
            'address' => 'string|nullable',
            'address2' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|min:2|max:2|nullable',
            'zip' => 'string|nullable',
            'phone' => 'nullable',
            'storageUnit' => 'integer|nullable'
        ];
    }
}
