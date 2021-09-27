<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Nette\Utils\Random;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();
        DB::table('users')->insert([
            'name' => 'omar',
            'lastname' => 'abdallah',
            'username'=> 'abdallah',
            'phone'=> '96179175660',
            'status'=> 'active',
            'photo'=> 'avatar.png',
            'role'=> 'user',
            'email' => 'omar'.'@gmail.com',
            'password' => Hash::make('123'),
            'address' => 'Lebanon'
         ]);
        //  DB::table('posts')->insert([
        //     'user_id' => '1',
        //     'from_country' => 'lb',
        //      'to_country' => 'ksa',
        //     'space' => Str::random(1),
        //     'cost' => Str::random(1),
        //     'date_depart'=>'2020-10-10',
        //     'date_arrive'=>'2020-10-10',
        //     'note' => 'omar'.'@gmail.com',
            
        //  ]);
    }
}
