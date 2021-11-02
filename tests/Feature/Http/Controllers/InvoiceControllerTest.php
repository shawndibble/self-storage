<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\InvoiceController;
use App\Http\Requests\InvoiceStoreRequest;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
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

    /** @test */
    public function index_displays_view()
    {
        Invoice::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('invoices.index'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Invoice/Index')
            ->has('invoices', 3));
    }


    /** @test */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('invoices.create'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Invoice/Create'));
    }


    /** @test */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            InvoiceController::class,
            'store',
            InvoiceStoreRequest::class
        );
    }

    /** @test */
    public function store_saves_and_redirects()
    {
        $user = User::factory()->create();
        $amount = $this->faker->numberBetween(1, 10000);
        $dueDate = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)
            ->from('/invoices')
            ->post(route('invoices.store'), [
                'user_id' => $user->id,
                'amount' => $amount,
                'due_date' => $dueDate,
            ]);

        $invoices = Invoice::query()
            ->where('user_id', $user->id)
            ->where('amount', $amount)
            ->get();
        $this->assertCount(1, $invoices);
        $invoice = $invoices->first();

        $response->assertRedirect('invoices')
            ->assertSessionHas('message', 'Invoice Created Successfully.')
            ->assertSessionHas('invoice.id', $invoice->id);
    }


    /** @test */
    public function show_displays_view()
    {
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('invoices.show', $invoice));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Invoice/Show')
            ->has('invoice'));
    }

    /** @test */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            InvoiceController::class,
            'update',
            InvoiceUpdateRequest::class
        );
    }

    /** @test */
    public function update_redirects()
    {
        $invoice = Invoice::factory()->create();
        $user = User::factory()->create();
        $amount = $this->faker->numberBetween(1, 10000);
        $dueDate = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)
            ->from('/invoices')
            ->put(route('invoices.update', $invoice), [
                'user_id' => $user->id,
                'amount' => $amount,
                'due_date' => $dueDate
            ]);

        $invoice->refresh();

        $response->assertRedirect('invoices')
            ->assertSessionHas('message', 'Invoice Updated Successfully.')
            ->assertSessionHas('invoice.id', $invoice->id);

        $this->assertEquals($user->id, $invoice->user_id);
        $this->assertEquals($amount, $invoice->amount);
        $this->assertEquals($dueDate, $invoice->due_date);
    }


    /** @test */
    public function destroy_deletes_and_redirects()
    {
        $invoice = Invoice::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from('/invoices')
            ->delete(route('invoices.destroy', $invoice));

        $response->assertRedirect('invoices')
            ->assertSessionHas('message', 'Invoice Deleted Successfully.');

        $this->assertDeleted($invoice);
    }
}
