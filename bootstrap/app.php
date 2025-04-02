<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        
        // Manejo de error 404
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            return \Inertia\Inertia::render('Errors/Error404')->toResponse($request)->setStatusCode(404);
        });

        // Manejo de error 403 (Acción no autorizada)
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException $e, $request) {
            return \Inertia\Inertia::render('Errors/Error403')->toResponse($request)->setStatusCode(403);
        });

        // Manejo de error 403 cuando se usa "abort(403)"
        $exceptions->render(function (\Illuminate\Auth\Access\AuthorizationException $e, $request) {
            return \Inertia\Inertia::render('Errors/Error403')->toResponse($request)->setStatusCode(403);
        });

        /* Error 500 (Error interno del servidor)
        $exceptions->render(function (\Throwable $e, $request) {
            return \Inertia\Inertia::render('Errors/Error500')->toResponse($request)->setStatusCode(500);
        });*/

        // Error 401 (No autenticado)
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            return \Inertia\Inertia::render('Errors/Error401')->toResponse($request)->setStatusCode(401);
        });

        // Error 419 (Sesión expirada)
        $exceptions->render(function (\Illuminate\Session\TokenMismatchException $e, $request) {
            return \Inertia\Inertia::render('Errors/Error419')->toResponse($request)->setStatusCode(419);
        });
    })->create();
