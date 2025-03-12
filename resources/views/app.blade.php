<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Consultorio') }}</title>

        <link rel="apple-touch-icon" sizes="16x16" href="{{ asset('icon/logoConsultorio16.png') }}">
        <link rel="apple-touch-icon" sizes="32x32" href="{{ asset('icon/logoConsultorio32.png') }}">
        <link rel="apple-touch-icon" sizes="48x48" href="{{ asset('icon/logoConsultorio48.png') }}">
        <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('icon/logoConsultorio72.png') }}">
        <link rel="apple-touch-icon" sizes="96x96" href="{{ asset('icon/logoConsultorio96.png') }}">
        <link rel="apple-touch-icon" sizes="128x128" href="{{ asset('icon/logoConsultorio128.png') }}">
        <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('icon/logoConsultorio144.png') }}">
        <link rel="apple-touch-icon" sizes="192x192" href="{{ asset('icon/logoConsultorio192.png') }}">
        <link rel="apple-touch-icon" sizes="384x384" href="{{ asset('icon/logoConsultorio384.png') }}">
        <link rel="apple-touch-icon" sizes="512x512" href="{{ asset('icon/logoConsultorio512.png') }}">
        
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icon/logoConsultorio16.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('icon/logoConsultorio32.png') }}">
        <link rel="icon" type="image/png" sizes="48x48" href="{{ asset('icon/logoConsultorio48.png') }}">
        <link rel="icon" type="image/png" sizes="72x72" href="{{ asset('icon/logoConsultorio72.png') }}">
        <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('icon/logoConsultorio96.png') }}">
        <link rel="icon" type="image/png" sizes="128x128" href="{{ asset('icon/logoConsultorio128.png') }}">
        <link rel="icon" type="image/png" sizes="144x144" href="{{ asset('icon/logoConsultorio144.png') }}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('icon/logoConsultorio192.png') }}">
        <link rel="icon" type="image/png" sizes="384x384" href="{{ asset('icon/logoConsultorio384.png') }}">
        <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('icon/logoConsultorio512.png') }}">
        

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
