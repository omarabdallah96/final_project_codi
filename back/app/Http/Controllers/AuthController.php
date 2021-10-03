<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; 


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
            'expires_in'   => auth('api')->factory()->getTTL() * 60*60
        ]);
    }
    public function uploadimage(Request $request ){
        
        $user = new User();

        $user->fill($request->all());
        
        if($photo=$request->file('photo'))
        {
            $photo=$request->photo;
            $photo->store('public/users_images/');
            $user->photo = $photo->hashName();
        }

        if($user->save()){

            return response()->json([
                "success"=>true,
                "users"=>$user
            ]);
        }else{
            return response()->json([
                "success"=>false,
                "tasks"=>"task could not be added"
            ],500);
        }

        
       
        

    }

    public function imageDelete(Request $request,$id){
        $user=User::find($id);
        $file=storage_path().'/app/public/users_images/'.$user->photo;



         $deleteimage=  unlink($file);
         if(unlink($deleteimage)){
            return response()->json([
                "success"=>true,
                "image"=>"image deleted"
            ]);       
          }
          else{
            return response()->json([
                "success"=>false,
                "error"=>"image not deleted"
            ]);     

          }

    }
    public function updateprofile(Request $request,$id ){
        $user=User::find($id);
        $file=storage_path().'/app/public/users_images/'.$user->photo;
        
           if ($user) {
          if (!$files = $request->file('photo')) {
             $user -> fill($request -> all());
            $user -> update();
            return response()->json([
                "success"=>true,
                "profile"=>"profile  updated"
                 ]);
            }
            $destinationPath = storage_path().'/app/public/users_images/';
            $profileImage =$files->hashName();
            $files->move($destinationPath, $profileImage);
            $update['photo'] = $profileImage;
            if ($user) {
                $user -> fill($request -> all());
                $user['photo'] = "$profileImage";
                $user -> update();
                if ($file){
                    unlink($file);

                }
                return response()->json([
         "success"=>true,
         "profile"=>"profile  updated"
          ]);
            }
        }
 
      
   
        return response()->json([
        "success"=>false,
        "image"=>"image not deleted deleted"
    ]);
    }
    public function alluser(){
        return User::all();
    }

}
