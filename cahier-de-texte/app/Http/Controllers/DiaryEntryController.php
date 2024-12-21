<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DiaryEntry;
use App\Models\Module;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DiaryEntryController extends Controller
{
    public function index(Request $request)
    {
        $query = DiaryEntry::with(['user', 'module', 'group'])
            ->when(Auth::user()->role !== 'admin', function ($query) {
                return $query->where('user_id', Auth::id());
            });

        if ($request->has('module')) {
            $query->where('module_id', $request->module);
        }

        $entries = $query->orderBy('session_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return Inertia::render('DiaryEntries/Index', [
            'entries' => $entries,
            'module' => $request->has('module') ? Module::find($request->module) : null
        ]);
    }

    public function create(Request $request)
    {
        $modules = Auth::user()->role === 'admin'
            ? Module::with(['professors', 'field', 'level'])->get()
            : Auth::user()->modules()->with(['field', 'level'])->get();
        
        $groups = Group::with(['field', 'level'])->get();
        
        return Inertia::render('DiaryEntries/Create', [
            'modules' => $modules,
            'groups' => $groups,
            'selectedModule' => $request->has('module') ? Module::find($request->module) : null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'module_id' => 'required|exists:modules,id',
            'group_id' => 'required|exists:groups,id',
            'session_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'content' => 'required|string'
        ]);

        $validated['user_id'] = Auth::id();

        // Check if user is assigned to the module or is admin
        $module = Module::findOrFail($validated['module_id']);
        if (Auth::user()->role !== 'admin' && !$module->professors()->where('users.id', Auth::id())->exists()) {
            abort(403, 'You are not assigned to this module.');
        }

        // Convert time strings to full datetime
        $validated['start_time'] = $validated['session_date'] . ' ' . $validated['start_time'] . ':00';
        $validated['end_time'] = $validated['session_date'] . ' ' . $validated['end_time'] . ':00';

        try {
            $entry = DiaryEntry::create($validated);
            return redirect()->route('diary-entries.index')
                ->with('message', 'Diary entry created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create diary entry.']);
        }
    }

    public function show(DiaryEntry $diaryEntry)
    {
        if (Auth::user()->role !== 'admin' && $diaryEntry->user_id !== Auth::id()) {
            abort(403);
        }

        $diaryEntry->load(['user', 'module', 'group']);
        
        return Inertia::render('DiaryEntries/Show', [
            'entry' => $diaryEntry
        ]);
    }

    public function edit(DiaryEntry $diaryEntry)
    {
        if (Auth::user()->role !== 'admin' && $diaryEntry->user_id !== Auth::id()) {
            abort(403);
        }

        $modules = Auth::user()->role === 'admin'
            ? Module::with('professors')->get()
            : Auth::user()->modules;

        $groups = Group::with(['field', 'level'])->get();

        return Inertia::render('DiaryEntries/Edit', [
            'entry' => $diaryEntry->load(['module', 'group']),
            'modules' => $modules,
            'groups' => $groups
        ]);
    }

    public function update(Request $request, DiaryEntry $diaryEntry)
    {
        if (Auth::user()->role !== 'admin' && $diaryEntry->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'module_id' => 'required|exists:modules,id',
            'group_id' => 'required|exists:groups,id',
            'session_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'content' => 'required|string'
        ]);

        // Check if user is assigned to the module or is admin
        $module = Module::findOrFail($validated['module_id']);
        if (Auth::user()->role !== 'admin' && !$module->professors()->where('users.id', Auth::id())->exists()) {
            abort(403, 'You are not assigned to this module.');
        }

        // Convert time strings to full datetime
        $validated['start_time'] = $validated['session_date'] . ' ' . $validated['start_time'] . ':00';
        $validated['end_time'] = $validated['session_date'] . ' ' . $validated['end_time'] . ':00';

        try {
            $diaryEntry->update($validated);
            return redirect()->route('diary-entries.index')
                ->with('message', 'Diary entry updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update diary entry.']);
        }
    }

    public function destroy(DiaryEntry $diaryEntry)
    {
        if (Auth::user()->role !== 'admin' && $diaryEntry->user_id !== Auth::id()) {
            abort(403);
        }

        try {
            $diaryEntry->delete();
            return redirect()->route('diary-entries.index')
                ->with('message', 'Diary entry deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete diary entry.']);
        }
    }
}
