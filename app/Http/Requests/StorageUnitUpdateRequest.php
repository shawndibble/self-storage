<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorageUnitUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['sometimes', 'required', 'string'],
            'size_id' => ['sometimes', 'required', 'integer', 'exists:sizes,id'],
            'user_id' => ['integer', 'exists:users,id', 'nullable'],
            'is_locked' => ['sometimes', 'required', 'boolean'],
            'notes' => ['string', 'nullable'],
        ];
    }
}
