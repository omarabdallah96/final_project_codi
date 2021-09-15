<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{


    use HasFactory;

    protected $fillable =[
        'id', 'id_re_user','post_id','status','date_order','description',
    ];

    protected $primaryKey = 'id';

}
