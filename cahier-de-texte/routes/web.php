<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\DiaryEntryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/dashboard');
    }
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        if ($user->role === 'admin') {
            return Inertia::render('Dashboard', [
                'stats' => [
                    'totalModules' => \App\Models\Module::count(),
                    'totalProfessors' => \App\Models\User::where('role', 'professor')->count(),
                    'totalFields' => \App\Models\Field::count(),
                    'totalLevels' => \App\Models\Level::count(),
                ]
            ]);
        } else {
            return redirect()->route('professor.modules');
        }
    })->name('dashboard');

    // Routes for both professors and admins
    Route::get('/professor/modules', [ModuleController::class, 'professorModules'])->name('professor.modules');
    Route::resource('diary-entries', DiaryEntryController::class);

    // Admin routes are protected by middleware in their respective controllers
    Route::resource('professors', ProfessorController::class);
    Route::resource('modules', ModuleController::class);
    Route::resource('fields', FieldController::class);
    Route::resource('levels', LevelController::class);
    Route::resource('groups', GroupController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
