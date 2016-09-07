<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title')</title>
        <link rel="stylesheet" href="/css/style.css" charset="utf-8">
        <style media="screen">
            #map {
                height: 300px;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script src="/js/jquery.js"></script>
        <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        </script>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq5NUFKaqLtZ1ex07s16NAcCRxYDil5LE&callback=initMap"
            async defer
        >
        </script>
        <script type="text/javascript">

        </script>
        <script src="/js/bundle.js"></script>
    </body>
</html>
