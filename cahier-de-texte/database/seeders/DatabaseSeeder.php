<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Field;
use App\Models\Level;
use App\Models\Group;
use App\Models\Module;
use App\Models\DiaryEntry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create professor users
        $professors = [
            [
                'name' => 'John Smith',
                'email' => 'john@example.com',
                'password' => Hash::make('password123'),
                'role' => 'professor'
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah@example.com',
                'password' => Hash::make('password123'),
                'role' => 'professor'
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael@example.com',
                'password' => Hash::make('password123'),
                'role' => 'professor'
            ]
        ];

        foreach ($professors as $professor) {
            User::create($professor);
        }

        // Create fields
        $fields = [
            [
                'name' => 'Computer Science',
                'description' => 'Study of computers and computational systems'
            ],
            [
                'name' => 'Mathematics',
                'description' => 'Study of numbers, quantities, and shapes'
            ],
            [
                'name' => 'Physics',
                'description' => 'Study of matter, energy, and their interactions'
            ]
        ];

        foreach ($fields as $field) {
            Field::create($field);
        }

        // Create levels
        $levels = [
            [
                'name' => 'First Year',
                'description' => 'First year undergraduate'
            ],
            [
                'name' => 'Second Year',
                'description' => 'Second year undergraduate'
            ],
            [
                'name' => 'Third Year',
                'description' => 'Third year undergraduate'
            ]
        ];

        foreach ($levels as $level) {
            Level::create($level);
        }

        // Create groups
        $groups = [
            [
                'name' => 'CS-1A',
                'field_id' => 1,
                'level_id' => 1
            ],
            [
                'name' => 'MATH-2B',
                'field_id' => 2,
                'level_id' => 2
            ],
            [
                'name' => 'PHY-3C',
                'field_id' => 3,
                'level_id' => 3
            ]
        ];

        foreach ($groups as $group) {
            Group::create($group);
        }

        // Create modules
        $modules = [
            [
                'name' => 'Introduction to Programming',
                'description' => 'Basic concepts of programming using Python',
                'field_id' => 1,
                'level_id' => 1
            ],
            [
                'name' => 'Linear Algebra',
                'description' => 'Study of linear equations and matrices',
                'field_id' => 2,
                'level_id' => 2
            ],
            [
                'name' => 'Quantum Mechanics',
                'description' => 'Introduction to quantum physics',
                'field_id' => 3,
                'level_id' => 3
            ]
        ];

        $moduleInstances = [];
        foreach ($modules as $module) {
            $moduleInstances[] = Module::create($module);
        }

        // Assign modules to professors
        $john = User::where('email', 'john@example.com')->first();
        $sarah = User::where('email', 'sarah@example.com')->first();
        $michael = User::where('email', 'michael@example.com')->first();

        $moduleInstances[0]->professors()->attach([$john->id, $sarah->id]);
        $moduleInstances[1]->professors()->attach([$sarah->id]);
        $moduleInstances[2]->professors()->attach([$michael->id]);

        // Create diary entries
        $diaryEntries = [
            [
                'user_id' => $john->id,
                'module_id' => $moduleInstances[0]->id,
                'group_id' => 1,
                'session_date' => '2024-01-15',
                'start_time' => '2024-01-15 09:00:00',
                'end_time' => '2024-01-15 10:30:00',
                'content' => 'Introduction to Python syntax and basic data types'
            ],
            [
                'user_id' => $sarah->id,
                'module_id' => $moduleInstances[1]->id,
                'group_id' => 2,
                'session_date' => '2024-01-16',
                'start_time' => '2024-01-16 14:00:00',
                'end_time' => '2024-01-16 15:30:00',
                'content' => 'Matrix operations and determinants'
            ],
            [
                'user_id' => $michael->id,
                'module_id' => $moduleInstances[2]->id,
                'group_id' => 3,
                'session_date' => '2024-01-17',
                'start_time' => '2024-01-17 11:00:00',
                'end_time' => '2024-01-17 12:30:00',
                'content' => 'Wave-particle duality and Schrödinger equation'
            ]
        ];

        foreach ($diaryEntries as $entry) {
            DiaryEntry::create($entry);
        }
    }
}
