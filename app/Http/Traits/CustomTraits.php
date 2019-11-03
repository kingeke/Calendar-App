<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\{Validator};

trait CustomTraits
{
    public function validation($data, $rules)
    {

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {

            return [
                'status' => 'error',
                'message' => $validator->errors()->first(),
                'code' => 422
            ];
        }

        return [
            'status' => 'success'
        ];
    }

    public function responseCodes($type, $message = null, $code = 200)
    {
        return response()->json([
            'status' => $type,
            'message' => $message
        ], $code);
    }

    public function notFound($title)
    {
        return $this->responseCodes('error', "$title not found", 404);
    }
}
