<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use League\CommonMark\CommonMarkConverter;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class BlogService
{
    protected string $path;

    protected $allPosts;

    public function __construct()
    {
        $this->path = resource_path('content/blog');
    }

    public function all()
    {
        if ($this->allPosts) {
            return $this->allPosts;
        }

        $files = File::files($this->path);

        $posts = collect($files)->map(function ($file) {
            $document = YamlFrontMatter::parseFile($file->getPathname());

            return [
                'slug' => str_replace('.md', '', $file->getFilename()),
                'title' => $document->matter('title'),
                'summary' => $document->matter('summary'),
                'published_at' => Carbon::parse(
                    $document->matter('published_at')
                )->format('F j, Y'),
                'cover_image' => $document->matter('cover_image'),
                'body' => app(CommonMarkConverter::class)
                    ->convert($document->body())
                    ->getContent(),
            ];
        });

        $this->allPosts = $posts
            ->sortByDesc('published_at')
            ->values();

        return $this->allPosts;
    }

    public function find(string $slug)
    {
        $posts = $this->all();
        $currentIndex = $posts->search(fn ($post) => $post['slug'] === $slug);

        if ($currentIndex === false) {
            return null;
        }

        $post = $posts[$currentIndex];
        $post['previous_post'] = $currentIndex > 0 ? $posts[$currentIndex - 1] : null;
        $post['next_post'] = $currentIndex < $posts->count() - 1 ? $posts[$currentIndex + 1] : null;

        return $post;
    }
}
