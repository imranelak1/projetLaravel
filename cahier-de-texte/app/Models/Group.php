<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Field;
use App\Models\Level;
use App\Models\DiaryEntry;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'field_id',
        'level_id'
    ];

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function diaryEntries()
    {
        return $this->hasMany(DiaryEntry::class);
    }
}
