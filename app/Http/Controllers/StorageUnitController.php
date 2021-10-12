<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageUnitStoreRequest;
use App\Http\Requests\StorageUnitUpdateRequest;
use App\Models\StorageUnit;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StorageUnitController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $storageUnits = StorageUnit::all();

        return Inertia::render('StorageUnit/Index', compact('storageUnits'));
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('StorageUnit/Create');
    }

    /**
     * @param StorageUnitStoreRequest $request
     * @return RedirectResponse
     */
    public function store(StorageUnitStoreRequest $request): RedirectResponse
    {
        $storageUnit = StorageUnit::create($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return back()->with('message', 'Unit Created Successfully.');
    }

    /**
     * @param StorageUnit $storageUnit
     * @return Response
     */
    public function show(StorageUnit $storageUnit): Response
    {
        return Inertia::render('StorageUnit/Show', compact('storageUnit'));
    }

    /**
     * @param StorageUnitUpdateRequest $request
     * @param StorageUnit $storageUnit
     * @return RedirectResponse
     */
    public function update(StorageUnitUpdateRequest $request, StorageUnit $storageUnit): RedirectResponse
    {
        $storageUnit->update($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return back()->with('message', 'Unit Updated Successfully.');
    }

    /**
     * @param StorageUnit $storageUnit
     * @return RedirectResponse
     */
    public function destroy(StorageUnit $storageUnit): RedirectResponse
    {
        $storageUnit->delete();

        return back()->with('message', 'Unit Deleted Successfully.');
    }
}
