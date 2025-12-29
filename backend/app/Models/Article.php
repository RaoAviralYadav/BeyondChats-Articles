<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'source_url',
        'scraped_at',
        'references',
        'updated_versions',
    ];

    protected $casts = [
        'scraped_at' => 'datetime',
        'references' => 'array',
        'updated_versions' => 'array',
    ];
}
