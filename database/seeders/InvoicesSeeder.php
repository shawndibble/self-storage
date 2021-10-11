<?php

namespace Database\Seeders;

use App\Models\Invoices;
use Illuminate\Database\Seeder;

class InvoicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Invoices::factory()->count(5)->create();
    }
}
