<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Module;
use App\Models\DiaryEntry;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => 'string',
    ];

    /**
     * Get the modules associated with the user.
     */
    public function modules()
    {
        return $this->belongsToMany(Module::class, 'module_user')
            ->with(['field', 'level'])
            ->withTimestamps();
    }

    /**
     * Get the diary entries created by the user.
     */
    public function diaryEntries()
    {
        return $this->hasMany(DiaryEntry::class);
    }

    /**
     * Check if the user is a professor.
     *
     * @return bool
     */
    public function isProfessor()
    {
        return $this->role === 'professor';
    }

    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
