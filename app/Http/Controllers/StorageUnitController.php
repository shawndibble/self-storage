<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageUnitStoreRequest;
use App\Http\Requests\StorageUnitUpdateRequest;
use App\Models\StorageUnit;
use Illuminate\Http\Request;

class StorageUnitController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $storageUnits = StorageUnit::all();

        return view('storageUnit.index', compact('storageUnits'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('storageUnit.create');
    }

    /**
     * @param \App\Http\Requests\StorageUnitStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorageUnitStoreRequest $request)
    {
        $storageUnit = StorageUnit::create($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return redirect()->route('storageUnit.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\StorageUnit $storageUnit
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, StorageUnit $storageUnit)
    {
        return view('storageUnit.show', compact('storageUnit'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\StorageUnit $storageUnit
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, StorageUnit $storageUnit)
    {
        return view('storageUnit.edit', compact('storageUnit'));
    }

    /**
     * @param \App\Http\Requests\StorageUnitUpdateRequest $request
     * @param \App\Models\StorageUnit $storageUnit
     * @return \Illuminate\Http\Response
     */
    public function update(StorageUnitUpdateRequest $request, StorageUnit $storageUnit)
    {
        $storageUnit->update($request->validated());

        $request->session()->flash('storageUnit.id', $storageUnit->id);

        return redirect()->route('storageUnit.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\StorageUnit $storageUnit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, StorageUnit $storageUnit)
    {
        $storageUnit->delete();

        return redirect()->route('storageUnit.index');
    }
}
