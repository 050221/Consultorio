<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only(['id', 'name', 'email']) // Solo datos básicos
                    : null,
                'roles' => $request->user()?->roles->pluck('name') ?? [], // Solo nombres de roles
                'permissions' => $request->user()?->permissions->pluck('name') ?? [], // Solo nombres de permisos
            ],
            /*
            'flash' => [
                'message' => session('message'),
            ],*/
        ];
    }
    
}
