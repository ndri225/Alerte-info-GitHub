<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAccounts\AdministrationModels;
use App\Services\CodeGenerator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdministrationModels::truncate();
        User::truncate();

        $new_user = new User();

        $new_user->email = "brou4859@gmail.com";
        $new_user->password =  password_hash('broudev@2024', PASSWORD_BCRYPT);


        if($new_user->save()){

            $new_user_info = new AdministrationModels();
            $new_user_info->user_id = $new_user->id;
            $new_user_info->role_id = 1;
            $new_user_info->status = 1;
            $new_user_info->type_accounts = "administration";
            $new_user_info->first_name = "BROU";
            $new_user_info->last_name = "Elie";
            $new_user_info->photo = "http://127.0.0.1:8000/media/admin_photo/admin_photo1702710878.png";
            $new_user_info->status = 1;
            $new_user_info->slug = CodeGenerator::generateSlugCode();
            $new_user_info->save();

        }
    }
}
