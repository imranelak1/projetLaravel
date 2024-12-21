<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;
use App\Models\Module;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
