<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Size;
use App\Models\StorageUnit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\StorageUnitController
 */
class StorageUnitControllerTest extends TestCase
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
        $storageUnits = StorageUnit::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('storage-unit.index'));

        $response->assertOk();
        $response->assertViewIs('storageUnit.index');
        $response->assertViewHas('storageUnits');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)->get(route('storage-unit.create'));

        $response->assertOk();
        $response->assertViewIs('storageUnit.create');
    }


//    /**
//     * @test
//     */
//    public function store_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            StorageUnitController::class,
//            'store',
//            StorageUnitStoreRequest::class
//        );
//    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $size = Size::factory()->create();
        $is_locked = $this->faker->numberBetween(-8, 8);

        $response = $this->actingAs($this->admin)->post(route('storage-unit.store'), [
            'name' => $name,
            'size_id' => $size->id,
            'is_locked' => $is_locked,
        ]);

        $storageUnits = StorageUnit::query()
            ->where('name', $name)
            ->where('size_id', $size->id)
            ->where('is_locked', $is_locked)
            ->get();
        $this->assertCount(1, $storageUnits);
        $storageUnit = $storageUnits->first();

        $response->assertRedirect(route('storageUnit.index'));
        $response->assertSessionHas('storageUnit.id', $storageUnit->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $storageUnit = StorageUnit::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('storage-unit.show', $storageUnit));

        $response->assertOk();
        $response->assertViewIs('storageUnit.show');
        $response->assertViewHas('storageUnit');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $storageUnit = StorageUnit::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('storage-unit.edit', $storageUnit));

        $response->assertOk();
        $response->assertViewIs('storageUnit.edit');
        $response->assertViewHas('storageUnit');
    }


//    /**
//     * @test
//     */
//    public function update_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            StorageUnitController::class,
//            'update',
//            StorageUnitUpdateRequest::class
//        );
//    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $storageUnit = StorageUnit::factory()->create();
        $name = $this->faker->name;
        $size = Size::factory()->create();
        $is_locked = $this->faker->numberBetween(-8, 8);

        $response = $this->actingAs($this->admin)->put(route('storage-unit.update', $storageUnit), [
            'name' => $name,
            'size_id' => $size->id,
            'is_locked' => $is_locked,
        ]);

        $storageUnit->refresh();

        $response->assertRedirect(route('storageUnit.index'));
        $response->assertSessionHas('storageUnit.id', $storageUnit->id);

        $this->assertEquals($name, $storageUnit->name);
        $this->assertEquals($size->id, $storageUnit->size_id);
        $this->assertEquals($is_locked, $storageUnit->is_locked);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $storageUnit = StorageUnit::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('storage-unit.destroy', $storageUnit));

        $response->assertRedirect(route('storageUnit.index'));

        $this->assertDeleted($storageUnit);
    }
}
