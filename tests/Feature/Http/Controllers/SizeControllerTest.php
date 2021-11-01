<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\SizeController;
use App\Http\Requests\SizeStoreRequest;
use App\Http\Requests\SizeUpdateRequest;
use App\Models\Size;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\SizeController
 */
class SizeControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    private $admin;

    public function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->admin()->create();
    }

    /** @test */
    public function index_displays_view()
    {
        Size::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('sizes.index'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Size/Index')
            ->has('sizes', 3));
    }


    /** @test */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('sizes.create'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Size/Create'));
    }


    /** @test */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            SizeController::class,
            'store',
            SizeStoreRequest::class
        );
    }

    /** @test */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $rate = $this->faker->numberBetween(0, 10000);

        $response = $this->actingAs($this->admin)
            ->from('/sizes')
            ->post(route('sizes.store'), [
                'name' => $name,
                'rate' => $rate,
            ]);

        $sizes = Size::query()
            ->where('name', $name)
            ->where('rate', $rate)
            ->get();
        $this->assertCount(1, $sizes);
        $size = $sizes->first();

        $response->assertRedirect(route('sizes.index'))
            ->assertSessionHas('message', 'Size Created Successfully.')
            ->assertSessionHas('size.id', $size->id);
    }


    /** @test */
    public function show_displays_view()
    {
        $size = Size::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('sizes.show', $size));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Size/Show')
            ->has('size'));
    }

    /** @test */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            SizeController::class,
            'update',
            SizeUpdateRequest::class
        );
    }

    /** @test */
    public function update_redirects()
    {
        $size = Size::factory()->create();
        $name = $this->faker->name;
        $rate = $this->faker->numberBetween(1, 10000);

        $response = $this->actingAs($this->admin)
            ->from('/sizes')
            ->put(route('sizes.update', $size), [
                'name' => $name,
                'rate' => $rate,
            ]);

        $size->refresh();

        $response->assertRedirect(route('sizes.index'))
            ->assertSessionHas('message', 'Size Updated Successfully.')
            ->assertSessionHas('size.id', $size->id);

        $this->assertEquals($name, $size->name);
        $this->assertEquals($rate, $size->rate);
    }


    /** @test */
    public function destroy_deletes_and_redirects()
    {
        $size = Size::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from('sizes')
            ->delete(route('sizes.destroy', $size));

        $response->assertRedirect(route('sizes.index'))
            ->assertSessionHas('message', 'Size Deleted Successfully.');

        $this->assertDeleted($size);
    }
}
