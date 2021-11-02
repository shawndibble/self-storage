<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::all();
        return Inertia::render('User/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserCreateRequest $request
     * @return RedirectResponse
     */
    public function store(UserCreateRequest $request): RedirectResponse
    {
        User::create($request->validated());
        return back()->with('message', 'User Created Successfully.');
    }

    /**
     * Display the specified resource & edit it.
     *
     * @param User $user
     * @return Response
     */
    public function show(User $user): Response
    {
        $invoices = DB::table('invoices')
            ->select('id', 'amount', 'due_date as date', DB::raw('"Invoice" as type'))
            ->where('user_id', $user->id);

        $transactions = DB::table('payments')
            ->select('id', 'amount', 'paid_at as date', DB::raw('"Payment" as type'))
            ->where('user_id', $user->id)
            ->union($invoices)
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('User/Show', [
            'user' => $user->load('storageUnits.size'),
            'transactions' => $transactions,
            'invoiceTotal' => Invoice::where('user_id', $user->id)->sum('amount'),
            'paymentTotal' => Payment::where('user_id', $user->id)->sum('amount'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UserUpdateRequest $request, User $user): RedirectResponse
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
