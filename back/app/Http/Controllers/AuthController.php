<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // $user = User::create([
        //     'username' => $request->username,
        //     'email'    => $request->email,
        //     'password' => $request->password,
        // ]);

        // $token = auth('api')->login($user);

        // return $this->respondWithToken($token);
        $user = new User();
        $user->fill($request->all());
        $user->save();
        if(!$user){
            return response()->json(['error'=>'error']);
        }
            return response()->json(['message'=>'saved successfully']);
        
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password','status']);
        $checkuser=User::where('email',request(['email']))->first();
        if($checkuser->status!="active"){
            return response()->json(['disabled' => 'this user was disabled'], 401);

        } 


        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
