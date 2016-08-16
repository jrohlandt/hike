<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>@yield('title')</title>
        <link rel="stylesheet" href="/css/main.css" charset="utf-8">
    </head>
    <body>
        <div id="app">
            <div class="container">
                @include('backend.partials.sidebar')
                <div class="content">
                    @yield('content')
                </div>
            </div>
        </div>

        @yield('scripts')
    </body>
</html>
