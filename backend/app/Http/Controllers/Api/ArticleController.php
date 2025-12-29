<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::orderBy('created_at','desc')->paginate(20));
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:articles,slug',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'source_url' => 'nullable|url',
            'scraped_at' => 'nullable|date',
            'references' => 'nullable|array',
        ]);

        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = Str::slug(substr($data['title'],0,200)) . '-' . Str::random(4);
        }

        $article = Article::create($data);
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|nullable|string|unique:articles,slug,'.$article->id,
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'source_url' => 'nullable|url',
            'references' => 'nullable|array',
            'updated_versions' => 'nullable|array',
        ]);

        $article->update($data);
        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'deleted']);
    }
}
