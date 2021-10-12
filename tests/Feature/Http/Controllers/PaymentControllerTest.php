<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\PaymentController;
use App\Http\Requests\PaymentStoreRequest;
use App\Http\Requests\PaymentUpdateRequest;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\PaymentController
 */
class PaymentControllerTest extends TestCase
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
        Payment::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('payment.index'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Payments/Index')
            ->has('payments', 3));
    }


    /** @test */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)
            ->get(route('payment.create'));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Payments/Create'));
    }


    /** @test */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            PaymentController::class,
            'store',
            PaymentStoreRequest::class
        );
    }

    /** @test */
    public function store_saves_and_redirects()
    {
        $invoice = Invoice::factory()->create();
        $amount = $this->faker->numberBetween(10, 10000);
        $paid_at = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)
            ->from('/payments')
            ->post(route('payment.store'), [
                'user_id' => $this->admin->id,
                'invoice_id' => $invoice->id,
                'amount' => $amount,
                'paid_at' => $paid_at,
            ]);

        $payments = Payment::query()
            ->where('user_id', $this->admin->id)
            ->where('invoice_id', $invoice->id)
            ->where('amount', $amount)
            ->where('paid_at', $paid_at)
            ->get();
        $this->assertCount(1, $payments);
        $payment = $payments->first();

        $response->assertRedirect('payments')
            ->assertSessionHas('message', 'Payment Recorded Successfully.')
            ->assertSessionHas('payment.id', $payment->id);
    }


    /** @test */
    public function show_displays_view()
    {
        $payment = Payment::factory()->create();

        $response = $this->actingAs($this->admin)
            ->get(route('payment.show', $payment));

        $response->assertInertia(fn(Assert $page) => $page
            ->component('Payments/Show')
            ->has('payment'));
    }

    /** @test */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            PaymentController::class,
            'update',
            PaymentUpdateRequest::class
        );
    }

    /** @test */
    public function update_redirects()
    {
        $payment = Payment::factory()->create();
        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();
        $amount = $this->faker->numberBetween(10, 10000);
        $paid_at = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)
            ->from('/payment')
            ->put(route('payment.update', $payment), [
                'user_id' => $user->id,
                'invoice_id' => $invoice->id,
                'amount' => $amount,
                'paid_at' => $paid_at,
            ]);

        $payment->refresh();

        $response->assertRedirect(route('payment.index'))
            ->assertSessionHas('payment.id', $payment->id)
            ->assertSessionHas('message', 'Payment Updated Successfully.');

        $this->assertEquals($user->id, $payment->user_id);
        $this->assertEquals($invoice->id, $payment->invoice_id);
        $this->assertEquals($amount, $payment->amount);
        $this->assertEquals($paid_at, $payment->paid_at);
    }


    /** @test */
    public function destroy_deletes_and_redirects()
    {
        $payment = Payment::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from(route('payment.index'))
            ->delete(route('payment.destroy', $payment));

        $response->assertRedirect(route('payment.index'))
            ->assertSessionHas('message', 'Payment Deleted Successfully.');

        $this->assertDeleted($payment);
    }
}
