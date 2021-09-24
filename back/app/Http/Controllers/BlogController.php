<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Order;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{

    /**
     * @param Request $request
     */
    public function store(Request $request){
        try{
            $blog = new Blog();
            $blog->fill($request->all());
            $blog->save();
            return  response()->json([
                "success"=>true,
                "blog"=>$blog
            ]);

        }
        catch(Exception $e){
            return  response()->json([
                "success"=>$e,
            ]);

        }

  
    }

    public function index($id)
    {
        $myorder=  Order::join('users','users.id','=','user_re_id')->where('orders.user_re_id',$id)->get(['orders.post_id']);

        return Blog::join('users','users.id','=','user_id')
        
        
        ->where('published',"published")->
        whereNotIn('posts.id',$myorder)

        
        ->whereNotIn('user_id', [$id])
        
        
        ->get(['posts.id AS post_id',"users.*","posts.*"])
        
        ;

    }

    public function update(Request $request, $id)
    {
        $blog = Blog::where('id', $id)->first();
        $blog->update($request->all());
    }

    public function destroy($id)
    {
        Blog::where('id', $id)->delete();
    }

    public function userpost(Request $request,$id )
    {
       
        return Blog::where('user_id',$id)->get();

    }

}
