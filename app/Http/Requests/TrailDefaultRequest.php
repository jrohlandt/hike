<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class TrailDefaultRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // TODO I am just returning true for now
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
            'name' => 'required|max:100',
            'description' => 'max:1000'
        ];
    }
}
