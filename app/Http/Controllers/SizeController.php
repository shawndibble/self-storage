<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeStoreRequest;
use App\Http\Requests\SizeUpdateRequest;
use App\Models\Size;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SizeController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $sizes = Size::all();
        return Inertia::render('Size/Index', compact('sizes'));
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Size/Create');
    }

    /**
     * @param SizeStoreRequest $request
     * @return RedirectResponse
     */
    public function store(SizeStoreRequest $request): RedirectResponse
    {
        $size = Size::create($request->validated());

        $request->session()->flash('size.id', $size->id);

        return back()->with('message', 'Size Created Successfully.');
    }

    /**
     * @param Size $size
     * @return Response
     */
    public function show(Size $size): Response
    {
        return Inertia::render('Size/Show', compact('size'));
    }

    /**
     * @param Size $size
     * @return Response
     */
    public function edit(Size $size): Response
    {
        return Inertia::render('size.edit', compact('size'));
    }

    /**
     * @param SizeUpdateRequest $request
     * @param Size $size
     * @return RedirectResponse
     */
    public function update(SizeUpdateRequest $request, Size $size): RedirectResponse
    {
        $size->update($request->validated());

        $request->session()->flash('size.id', $size->id);

        return back()->with('message', 'Size Updated Successfully.');
    }

    /**
     * @param Size $size
     * @return RedirectResponse
     */
    public function destroy(Size $size): RedirectResponse
    {
        $size->delete();

        return back()->with('message', 'Size Deleted Successfully.');
    }
}
