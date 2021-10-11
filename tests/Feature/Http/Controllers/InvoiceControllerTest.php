<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\InvoiceController
 */
class InvoiceControllerTest extends TestCase
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
        $invoices = Invoice::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('invoice.index'));

        $response->assertOk();
        $response->assertViewIs('invoice.index');
        $response->assertViewHas('invoices');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)->get(route('invoice.create'));

        $response->assertOk();
        $response->assertViewIs('invoice.create');
    }


//    /**
//     * @test
//     */
//    public function store_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            InvoiceController::class,
//            'store',
//            InvoiceStoreRequest::class
//        );
//    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $user = User::factory()->create();
        $total = $this->faker->numberBetween(1, 10000);

        $response = $this->actingAs($this->admin)->post(route('invoice.store'), [
            'user_id' => $user->id,
            'total' => $total,
        ]);

        $invoices = Invoice::query()
            ->where('user_id', $user->id)
            ->where('total', $total)
            ->get();
        $this->assertCount(1, $invoices);
        $invoice = $invoices->first();

        $response->assertRedirect(route('invoice.index'));
        $response->assertSessionHas('invoice.id', $invoice->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('invoice.show', $invoice));

        $response->assertOk();
        $response->assertViewIs('invoice.show');
        $response->assertViewHas('invoice');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('invoice.edit', $invoice));

        $response->assertOk();
        $response->assertViewIs('invoice.edit');
        $response->assertViewHas('invoice');
    }


//    /**
//     * @test
//     */
//    public function update_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            InvoiceController::class,
//            'update',
//            InvoiceUpdateRequest::class
//        );
//    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $invoice = Invoice::factory()->create();
        $user = User::factory()->create();
        $total = $this->faker->numberBetween(1, 10000);

        $response = $this->actingAs($this->admin)->put(route('invoice.update', $invoice), [
            'user_id' => $user->id,
            'total' => $total,
        ]);

        $invoice->refresh();

        $response->assertRedirect(route('invoice.index'));
        $response->assertSessionHas('invoice.id', $invoice->id);

        $this->assertEquals($user->id, $invoice->user_id);
        $this->assertEquals($total, $invoice->total);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('invoice.destroy', $invoice));

        $response->assertRedirect(route('invoice.index'));

        $this->assertDeleted($invoice);
    }
}
