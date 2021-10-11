<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Size;
use App\Models\StorageUnit;
use App\Models\User;

class StorageUnitFactory extends Factory
{
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
            'name' => $this->faker->name,
            'size_id' => Size::factory(),
            'user_id' => User::factory(),
            'is_locked' => $this->faker->numberBetween(-8, 8),
            'notes' => $this->faker->text,
        ];
    }
}
