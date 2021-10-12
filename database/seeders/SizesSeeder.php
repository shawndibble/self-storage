<?php

namespace Database\Seeders;

use App\Models\Sizes;
use Illuminate\Database\Seeder;

class SizesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sizes::factory()->count(5)->create();
    }
}
