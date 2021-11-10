<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageUnitRequest;
use App\Models\Size;
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
        return Inertia::render('StorageUnit/Index', [
            'storageUnits' => StorageUnit::with('size', 'user:id,name')->get(),
            'sizes' => Size::all()
        ]);
    }

    /**
     * @param StorageUnitRequest $request
     * @return RedirectResponse
     */
    public function store(StorageUnitRequest $request): RedirectResponse
    {
        $storageUnit = StorageUnit::create($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return back()->with('message', 'Unit Created Successfully.');
    }

    /**
     * @param $identity
     * @return Response
     */
    public function show($identity): Response
    {
        return Inertia::render('StorageUnit/Show', [
            'sizes' => Size::all(),
            'storageUnit' => StorageUnit::with(['user:id,name', 'size'])->findOrFail($identity),
        ]);
    }

    /**
     * @param StorageUnitRequest $request
     * @param StorageUnit $storageUnit
     * @return RedirectResponse
     */
    public function update(StorageUnitRequest $request, StorageUnit $storageUnit): RedirectResponse
    {
        $storageUnit->update($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return back()->with('message', "Unit {$storageUnit->name} Updated Successfully.");
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
