<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfessorController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized action.');
            }
            return $next($request);
        });
    }

    public function index()
    {
        $professors = User::where('role', 'professor')
            ->withCount('diaryEntries')
            ->withCount('modules')
            ->get();

        return Inertia::render('Professors/Index', [
            'professors' => $professors
        ]);
    }

    public function create()
    {
        return Inertia::render('Professors/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $professor = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'professor',
        ]);

        return redirect()->route('professors.index')
            ->with('message', 'Professor created successfully');
    }

    public function show(User $professor)
    {
        $professor->load(['modules', 'diaryEntries']);
        
        return Inertia::render('Professors/Show', [
            'professor' => $professor
        ]);
    }

    public function edit(User $professor)
    {
        return Inertia::render('Professors/Edit', [
            'professor' => $professor
        ]);
    }

    public function update(Request $request, User $professor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $professor->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $professor->name = $validated['name'];
        $professor->email = $validated['email'];
        
        if (!empty($validated['password'])) {
            $professor->password = Hash::make($validated['password']);
        }

        $professor->save();

        return redirect()->route('professors.index')
            ->with('message', 'Professor updated successfully');
    }

    public function destroy(User $professor)
    {
        $professor->delete();

        return redirect()->route('professors.index')
            ->with('message', 'Professor deleted successfully');
    }
}
