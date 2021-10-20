<?php

namespace Database\Seeders;

use App\Models\StorageUnit;
use Illuminate\Database\Seeder;

class StorageUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StorageUnit::factory()->count(5)->create();
    }
}
