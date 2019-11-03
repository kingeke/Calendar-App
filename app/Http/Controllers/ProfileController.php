<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Traits\CustomTraits;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    use CustomTraits;

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if ($this->user = Auth::guard('users')->user()) {
                return $next($request);
            } else {
                return $this->responseCodes('error', 'You are not authorized to be here.', 401);
            }
        });
    }

    /**
     * Fetch user profile
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function user()
    {
        return response()->json([
            'status' => 'success',
            'user' => $this->user
        ]);
    }

    /**
     * Change a users password
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $this->user;

        if (Hash::check($request->currentPassword, $user->password)) {

            $user->update(['password' => $request->password]);

            return $this->responseCodes('success', 'Password changed successfully.');
        } else {
            return $this->responseCodes('error', 'Current password does not match, please enter your current password.', 403);
        }
    }

    /**
     * Update the profile of a user
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $this->user->update($request->all());

        return $this->responseCodes('success', 'Profile updated successfully');
    }
}
