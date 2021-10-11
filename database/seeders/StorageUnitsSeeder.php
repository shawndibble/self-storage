<?php

namespace Database\Seeders;

use App\Models\StorageUnits;
use Illuminate\Database\Seeder;

class StorageUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StorageUnits::factory()->count(5)->create();
    }
}
