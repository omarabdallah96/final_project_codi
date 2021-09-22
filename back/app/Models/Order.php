<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{


    use HasFactory;

    protected $fillable =[
        'id', 'user_re_id','post_id','order_status','date_order','description',"space",
    ];
    protected $primaryKey = 'id';

}
