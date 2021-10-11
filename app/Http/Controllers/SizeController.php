<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeStoreRequest;
use App\Http\Requests\SizeUpdateRequest;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sizes = Size::all();

        return view('size.index', compact('sizes'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('size.create');
    }

    /**
     * @param \App\Http\Requests\SizeStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(SizeStoreRequest $request)
    {
        $size = Size::create($request->validated());

        $request->session()->flash('size.id', $size->id);

        return redirect()->route('size.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Size $size
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Size $size)
    {
        return view('size.show', compact('size'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Size $size
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Size $size)
    {
        return view('size.edit', compact('size'));
    }

    /**
     * @param \App\Http\Requests\SizeUpdateRequest $request
     * @param \App\Models\Size $size
     * @return \Illuminate\Http\Response
     */
    public function update(SizeUpdateRequest $request, Size $size)
    {
        $size->update($request->validated());

        $request->session()->flash('size.id', $size->id);

        return redirect()->route('size.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Size $size
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Size $size)
    {
        $size->delete();

        return redirect()->route('size.index');
    }
}
