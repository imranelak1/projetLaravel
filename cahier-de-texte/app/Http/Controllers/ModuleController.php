<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Field;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(AdminMiddleware::class)->except('professorModules');
    }

    public function professorModules()
    {
        $user = auth()->user();
        
        if ($user->role !== 'professor' && $user->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $modules = $user->role === 'admin' 
            ? Module::with(['field', 'level'])->get()
            : $user->modules()->with(['field', 'level'])->get();

        return Inertia::render('Professor/Modules', [
            'modules' => $modules,
            'isAdmin' => $user->role === 'admin'
        ]);
    }

    public function index()
    {
        $modules = Module::with(['field', 'level', 'professors'])->get();

        return Inertia::render('Modules/Index', [
            'modules' => $modules,
            'canCreate' => true,
            'canEdit' => true,
            'canDelete' => true
        ]);
    }

    public function create()
    {
        $fields = Field::all();
        $levels = Level::all();
        $professors = User::where('role', 'professor')->get();

        return Inertia::render('Modules/Create', [
            'fields' => $fields,
            'levels' => $levels,
            'professors' => $professors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'field_id' => 'required|exists:fields,id',
            'level_id' => 'required|exists:levels,id',
            'professor_ids' => 'required|array',
            'professor_ids.*' => 'exists:users,id'
        ]);

        try {
            $module = Module::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'field_id' => $validated['field_id'],
                'level_id' => $validated['level_id'],
            ]);

            $module->professors()->attach($validated['professor_ids']);

            return redirect()->route('modules.index')
                ->with('message', 'Module created successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create module. Please try again.']);
        }
    }

    public function show(Module $module)
    {
        if (auth()->user()->role === 'admin') {
            $module->load(['field', 'level', 'professors']);

            return Inertia::render('Modules/Admin/Show', [
                'module' => $module
            ]);
        } elseif ($module->professors()->where('users.id', auth()->id())->exists()) {
            $module->load(['field', 'level', 'professors']);

            return Inertia::render('Modules/Professor/Show', [
                'module' => $module
            ]);
        } else {
            abort(403, 'You are not assigned to this module.');
        }
    }

    public function edit(Module $module)
    {
        if (auth()->user()->role !== 'admin' && !$module->professors()->where('users.id', auth()->id())->exists()) {
            abort(403);
        }

        $fields = Field::all();
        $levels = Level::all();
        $professors = User::where('role', 'professor')->get();

        return Inertia::render('Modules/Edit', [
            'module' => $module->load('professors'),
            'fields' => $fields,
            'levels' => $levels,
            'professors' => $professors
        ]);
    }

    public function update(Request $request, Module $module)
    {
        if (auth()->user()->role !== 'admin' && !$module->professors()->where('users.id', auth()->id())->exists()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'field_id' => 'required|exists:fields,id',
            'level_id' => 'required|exists:levels,id',
            'professor_ids' => 'required|array',
            'professor_ids.*' => 'exists:users,id'
        ]);

        try {
            $module->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'field_id' => $validated['field_id'],
                'level_id' => $validated['level_id'],
            ]);

            $module->professors()->sync($validated['professor_ids']);

            return redirect()->route('modules.index')
                ->with('message', 'Module updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update module. Please try again.']);
        }
    }

    public function destroy(Module $module)
    {
        if (auth()->user()->role !== 'admin' && !$module->professors()->where('users.id', auth()->id())->exists()) {
            abort(403);
        }

        try {
            $module->professors()->detach();
            $module->delete();

            return redirect()->route('modules.index')
                ->with('message', 'Module deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete module. Please try again.']);
        }
    }
}
