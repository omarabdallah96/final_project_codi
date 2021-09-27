<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable =[
        'cost', 'user_id','from_country','to_country','space','date_depart','date_arrive','note',
    ];

    protected $primaryKey = 'id';

    protected $table = 'posts';

}
