<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\ResponseTrait;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldController extends Controller
{
    use ResponseTrait;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized action.');
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fields = Field::with(['groups', 'modules'])->get();
        return Inertia::render('Fields/Index', ['fields' => $fields]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Fields/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $field = Field::create($validated);

        return $this->successResponse($field, 'Field created successfully.', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Field $field)
    {
        $field->load(['groups', 'modules']);
        return Inertia::render('Fields/Show', ['field' => $field]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Field $field)
    {
        return Inertia::render('Fields/Edit', ['field' => $field]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Field $field)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $field->update($validated);

        return $this->successResponse($field, 'Field updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Field $field)
    {
        $field->delete();
        return $this->successResponse(null, 'Field deleted successfully.');
    }
}
