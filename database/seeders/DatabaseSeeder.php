<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Payment;
use App\Models\Size;
use App\Models\StorageUnit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Size::factory()
            ->count(3)
            ->state(new Sequence(
                ['name' => '10x10'],
                ['name' => '10x15'],
                ['name' => '10x20'],
            ))
            ->create();

        User::factory(10)
            ->has(Payment::factory()->count(10))
            ->has(Invoice::factory()->count(3)
                ->has(InvoiceItem::factory()->count(2), 'items'))
            ->has(StorageUnit::factory()
                ->state(fn() => ['size_id' => random_int(1, 3)]))
            ->create();

        User::factory()->admin()->create([
            'email' => 'test@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
