<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'password' => Hash::make('password'),
            'avatar' => 'https://ui-avatars.com/api/?name=' . urlencode($this->faker->firstName()),
            'date_of_birth' => $this->faker->date('Y-m-d', '2005-01-01'),
        ];
    }
}
