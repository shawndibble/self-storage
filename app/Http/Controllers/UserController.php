<?php

namespace App\Http\Controllers;

use App\Http\Repositories\StorageUnitRepository;
use App\Http\Requests\UserRequest;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\StorageUnit;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(StorageUnitRepository $storageUnit): Response
    {
        return Inertia::render('User/Index', [
            'users' => User::with('storageUnits')->get(),
            'storageUnits' => Inertia::lazy(fn() => $storageUnit->selectIndex()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return RedirectResponse
     * @throws Throwable
     */
    public function store(UserRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $validated = $request->validated();
            $user = User::create($validated);

            if ($request->filled('storageUnit')) {
                StorageUnit::where('id', $validated['storageUnit'])->update(['user_id' => $user->id]);
            }
        });

        return back()->with('message', 'User Created Successfully.');
    }

    /**
     * Display the specified resource & edit it.
     *
     * @param User $user
     * @param StorageUnitRepository $storageUnit
     * @return Response
     */
    public function show(User $user, StorageUnitRepository $storageUnit): Response
    {
        $invoices = DB::table('invoices')
            ->select('id as record_id', 'amount', 'due_date as date', DB::raw('"Invoice" as type'))
            ->where('user_id', $user->id);

        $transactions = DB::table('payments')
            ->select('id as record_id', 'amount', 'paid_at as date', DB::raw('"Payment" as type'))
            ->where('user_id', $user->id)
            ->union($invoices)
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('User/Show', [
            'user' => $user->load('storageUnits.size'),
            'transactions' => $transactions,
            'invoiceTotal' => (int)Invoice::where('user_id', $user->id)->sum('amount'),
            'paymentTotal' => (int)Payment::where('user_id', $user->id)->sum('amount'),
            'storageUnits' => Inertia::lazy(fn() => $storageUnit->selectIndex()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());
        return back()->with('message', 'User Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return back()->with('message', 'User Deleted Successfully.');
    }
}
