<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Size;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

    /**
     * @test
     */
    public function index_displays_view()
    {
        $sizes = Size::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('size.index'));

        $response->assertOk();
        $response->assertViewIs('size.index');
        $response->assertViewHas('sizes');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)->get(route('size.create'));

        $response->assertOk();
        $response->assertViewIs('size.create');
    }


//    /**
//     * @test
//     */
//    public function store_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            SizeController::class,
//            'store',
//            SizeStoreRequest::class
//        );
//    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $rate = $this->faker->numberBetween(0, 10000);

        $response = $this->actingAs($this->admin)->post(route('size.store'), [
            'name' => $name,
            'rate' => $rate,
        ]);

        $sizes = Size::query()
            ->where('name', $name)
            ->where('rate', $rate)
            ->get();
        $this->assertCount(1, $sizes);
        $size = $sizes->first();

        $response->assertRedirect(route('size.index'));
        $response->assertSessionHas('size.id', $size->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $size = Size::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('size.show', $size));

        $response->assertOk();
        $response->assertViewIs('size.show');
        $response->assertViewHas('size');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $size = Size::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('size.edit', $size));

        $response->assertOk();
        $response->assertViewIs('size.edit');
        $response->assertViewHas('size');
    }


//    /**
//     * @test
//     */
//    public function update_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            SizeController::class,
//            'update',
//            SizeUpdateRequest::class
//        );
//    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $size = Size::factory()->create();
        $name = $this->faker->name;
        $rate = $this->faker->numberBetween(1, 10000);

        $response = $this->actingAs($this->admin)->put(route('size.update', $size), [
            'name' => $name,
            'rate' => $rate,
        ]);

        $size->refresh();

        $response->assertRedirect(route('size.index'));
        $response->assertSessionHas('size.id', $size->id);

        $this->assertEquals($name, $size->name);
        $this->assertEquals($rate, $size->rate);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $size = Size::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('size.destroy', $size));

        $response->assertRedirect(route('size.index'));

        $this->assertDeleted($size);
    }
}
