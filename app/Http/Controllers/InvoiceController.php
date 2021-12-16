<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceStoreRequest;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Invoice;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $invoices = Invoice::all();
        return Inertia::render('Invoice/Index', compact('invoices'));
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Invoice/Create');
    }

    /**
     * @param InvoiceStoreRequest $request
     * @return RedirectResponse
     */
    public function store(InvoiceStoreRequest $request): RedirectResponse
    {
        $invoice = Invoice::create($request->validated());

        $request->session()->flash('invoice.id', $invoice->id);

        return back()->with('message', 'Invoice Created Successfully.');
    }

    /**
     * @param Invoice $invoice
     * @return Response
     */
    public function show(Invoice $invoice): Response
    {
        return Inertia::render('Invoice/Show', [
            'invoice' => $invoice->load('items')
        ]);
    }

    /**
     * @param InvoiceUpdateRequest $request
     * @param Invoice $invoice
     * @return RedirectResponse
     */
    public function update(InvoiceUpdateRequest $request, Invoice $invoice): RedirectResponse
    {
        $invoice->update($request->validated());

        $request->session()->flash('invoice.id', $invoice->id);

        return back()->with('message', 'Invoice Updated Successfully.');
    }

    /**
     * @param Invoice $invoice
     * @return RedirectResponse
     */
    public function destroy(Invoice $invoice): RedirectResponse
    {
        $invoice->delete();

        return back()->with('message', 'Invoice Deleted Successfully.');
    }
}
