<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\ResponseTrait;
use App\Models\Group;
use App\Models\Field;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
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
        $groups = Group::with(['field', 'level', 'diaryEntries'])->get();
        return Inertia::render('Groups/Index', ['groups' => $groups]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $fields = Field::all();
        $levels = Level::all();
        return Inertia::render('Groups/Create', [
            'fields' => $fields,
            'levels' => $levels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'field_id' => 'required|exists:fields,id',
            'level_id' => 'required|exists:levels,id'
        ]);

        $group = Group::create($validated);

        return $this->successResponse($group, 'Group created successfully.', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        $group->load(['field', 'level', 'diaryEntries']);
        return Inertia::render('Groups/Show', ['group' => $group]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        $fields = Field::all();
        $levels = Level::all();
        return Inertia::render('Groups/Edit', [
            'group' => $group,
            'fields' => $fields,
            'levels' => $levels
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'field_id' => 'required|exists:fields,id',
            'level_id' => 'required|exists:levels,id'
        ]);

        $group->update($validated);

        return $this->successResponse($group, 'Group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $group->delete();
        return $this->successResponse(null, 'Group deleted successfully.');
    }
}
