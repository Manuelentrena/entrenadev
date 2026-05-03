<?php

namespace App\Http\Controllers;

use App\Services\BlogService;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(BlogService $blog)
    {
        return Inertia::render('blog/index', [
            'posts' => $blog->all(),
        ]);
    }

    public function show(string $slug, BlogService $blog)
    {
        $post = $blog->find($slug);

        abort_if(! $post, 404);

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
