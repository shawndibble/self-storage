<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\StorageUnitController;
use App\Http\Requests\StorageUnitRequest;
use App\Http\Requests\StorageUnitUpdateRequest;
use App\Models\Size;
use App\Models\StorageUnit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
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

    /** @test */
    public function index_displays_view()
    {
        StorageUnit::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('storage-units.index'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('StorageUnit/Index')
            ->has('storageUnits', 3));
    }

    /** @test */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            StorageUnitController::class,
            'store',
            StorageUnitRequest::class
        );
    }

    /** @test */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $size = Size::factory()->create();
        $is_locked = $this->faker->numberBetween(-8, 8);

        $response = $this->actingAs($this->admin)
            ->from('/storage-units')
            ->post(route('storage-units.store'), [
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

        $response->assertRedirect(route('storage-units.index'))
            ->assertSessionHas('message', 'Unit Created Successfully.')
            ->assertSessionHas('storageUnit.id', $storageUnit->id);
    }


    /** @test */
    public function show_displays_view()
    {
        $storageUnit = StorageUnit::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('storage-units.show', $storageUnit));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('StorageUnit/Show')
            ->has('storageUnit'));
    }

    /** @test */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            StorageUnitController::class,
            'update',
            StorageUnitRequest::class
        );
    }

    /** @test */
    public function update_redirects()
    {
        $storageUnit = StorageUnit::factory()->create();
        $name = $this->faker->name;
        $size = Size::factory()->create();
        $is_locked = $this->faker->numberBetween(-8, 8);

        $response = $this->actingAs($this->admin)
            ->from('/storage-units')
            ->put(route('storage-units.update', $storageUnit), [
                'name' => $name,
                'size_id' => $size->id,
                'is_locked' => $is_locked,
            ]);

        $storageUnit->refresh();

        $response->assertRedirect(route('storage-units.index'))
            ->assertSessionHas('message', "Unit {$storageUnit->name} Updated Successfully.")
            ->assertSessionHas('storageUnit.id', $storageUnit->id);

        $this->assertEquals($name, $storageUnit->name);
        $this->assertEquals($size->id, $storageUnit->size_id);
        $this->assertEquals($is_locked, $storageUnit->is_locked);
    }


    /** @test */
    public function destroy_deletes_and_redirects()
    {
        $storageUnit = StorageUnit::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from('storage-units')
            ->delete(route('storage-units.destroy', $storageUnit));

        $response->assertRedirect(route('storage-units.index'))
            ->assertSessionHas('message', 'Unit Deleted Successfully.');

        $this->assertDeleted($storageUnit);
    }
}
