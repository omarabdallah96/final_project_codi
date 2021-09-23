<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Order::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        try{

            $order = new Order();
            $order->fill($request->all());
            $order->save();
         return  response()->json([
            "success"=>true,
            "order"=>$order
        ]);
           
        //    return response()->json(['success' => 'new order sent to '], 200 );

        }
        catch(Exception $e){
            return response()->json(['error' => 'order not sended'], 401);

        }
      
       
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function myorder(Order $order ,$id)
    {
        return  Order::join('users','users.id','=','user_re_id')->where('orders.user_re_id',$id)->get(['orders.id AS order_id','orders.*','users.*']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function deleteOrder(Order $order ,$id)
    {
         $deleteorder= Order::find($id);

         
         
        if ($deleteorder){

            $deleteorder->delete();
            return response()->json(['succes' => 'Order  Deleted'], 200);

        }
        return response()->json(['error' => 'Order not Delete'], 401);


    }

 
   

}
