<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentStoreRequest;
use App\Http\Requests\PaymentUpdateRequest;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $payments = Payment::with('user:id,name')
            ->select('id', 'amount', 'paid_at', 'user_id')
            ->orderBy('paid_at', 'desc')
            ->get();

        return Inertia::render('Payment/Index', compact('payments'));
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Payment/Create');
    }

    /**
     * @param PaymentStoreRequest $request
     * @return RedirectResponse
     */
    public function store(PaymentStoreRequest $request): RedirectResponse
    {
        $payment = Payment::create($request->validated());

        $request->session()->flash('payment.id', $payment->id);

        return back()->with('message', 'Payment Recorded Successfully.');
    }

    /**
     * @param Payment $payment
     * @return Response
     */
    public function show(Payment $payment): Response
    {
        return Inertia::render('Payment/Show', compact('payment'));
    }

    /**
     * @param PaymentUpdateRequest $request
     * @param Payment $payment
     * @return RedirectResponse
     */
    public function update(PaymentUpdateRequest $request, Payment $payment): RedirectResponse
    {
        $payment->update($request->validated());

        $request->session()->flash('payment.id', $payment->id);

        return back()->with('message', 'Payment Updated Successfully.');
    }

    /**
     * @param Payment $payment
     * @return RedirectResponse
     */
    public function destroy(Payment $payment): RedirectResponse
    {
        $payment->delete();

        return back()->with('message', 'Payment Deleted Successfully.');
    }
}
