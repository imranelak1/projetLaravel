<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Field;
use App\Models\Level;
use App\Models\User;
use App\Models\DiaryEntry;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'field_id',
        'level_id'
    ];

    protected $with = ['field', 'level', 'professors'];

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function professors()
    {
        return $this->belongsToMany(User::class, 'module_user')
            ->where('role', 'professor')
            ->withTimestamps();
    }

    public function diaryEntries()
    {
        return $this->hasMany(DiaryEntry::class);
    }
}
