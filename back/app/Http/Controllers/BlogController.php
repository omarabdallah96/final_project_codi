<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{

    /**
     * @param Request $request
     */
    public function store(Request $request){

        $blog = new Blog();
        $blog->fill($request->all());
        $blog->save();
    }

    public function index()
    {
        return Blog::where('id', 1)->first();
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

    public function rate()
    {

    }

}
