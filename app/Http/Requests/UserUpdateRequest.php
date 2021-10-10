<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'email' => 'email|unique:users,email_address',
            'is_admin' => 'bool',
            'address' => 'string',
            'address2' => 'string',
            'city' => 'string',
            'state' => 'string|min:2|max:2',
            'zip' => 'string',
            'phone' => 'integer'
        ];
    }
}
