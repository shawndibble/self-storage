<?php

namespace Database\Factories;

use App\Models\Size;
use App\Models\StorageUnit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StorageUnitFactory extends Factory
{
    private static int $order = 1;
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StorageUnit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => self::$order++,
            'size_id' => Size::factory(),
            'user_id' => User::factory(),
            'is_locked' => $this->faker->boolean(20),
            'notes' => $this->faker->text,
        ];
    }
}
