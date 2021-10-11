<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

    /**
     * @test
     */
    public function index_displays_view()
    {
        $payments = Payment::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('payment.index'));

        $response->assertOk();
        $response->assertViewIs('payment.index');
        $response->assertViewHas('payments');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->actingAs($this->admin)->get(route('payment.create'));

        $response->assertOk();
        $response->assertViewIs('payment.create');
    }


//    /**
//     * @test
//     */
//    public function store_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            PaymentController::class,
//            'store',
//            PaymentStoreRequest::class
//        );
//    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();
        $amount = $this->faker->word;
        $paid_at = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)->post(route('payment.store'), [
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
            'amount' => $amount,
            'paid_at' => $paid_at,
        ]);

        $payments = Payment::query()
            ->where('user_id', $user->id)
            ->where('invoice_id', $invoice->id)
            ->where('amount', $amount)
            ->where('paid_at', $paid_at)
            ->get();
        $this->assertCount(1, $payments);
        $payment = $payments->first();

        $response->assertRedirect(route('payment.index'));
        $response->assertSessionHas('payment.id', $payment->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $payment = Payment::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('payment.show', $payment));

        $response->assertOk();
        $response->assertViewIs('payment.show');
        $response->assertViewHas('payment');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $payment = Payment::factory()->create();

        $response = $this->actingAs($this->admin)->get(route('payment.edit', $payment));

        $response->assertOk();
        $response->assertViewIs('payment.edit');
        $response->assertViewHas('payment');
    }


//    /**
//     * @test
//     */
//    public function update_uses_form_request_validation()
//    {
//        $this->assertActionUsesFormRequest(
//            PaymentController::class,
//            'update',
//            PaymentUpdateRequest::class
//        );
//    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $payment = Payment::factory()->create();
        $user = User::factory()->create();
        $invoice = Invoice::factory()->create();
        $amount = $this->faker->word;
        $paid_at = $this->faker->dateTime();

        $response = $this->actingAs($this->admin)->put(route('payment.update', $payment), [
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
            'amount' => $amount,
            'paid_at' => $paid_at,
        ]);

        $payment->refresh();

        $response->assertRedirect(route('payment.index'));
        $response->assertSessionHas('payment.id', $payment->id);

        $this->assertEquals($user->id, $payment->user_id);
        $this->assertEquals($invoice->id, $payment->invoice_id);
        $this->assertEquals($amount, $payment->amount);
        $this->assertEquals($paid_at, $payment->paid_at);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $payment = Payment::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('payment.destroy', $payment));

        $response->assertRedirect(route('payment.index'));

        $this->assertDeleted($payment);
    }
}
