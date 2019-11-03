<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
    <!-- Datetime picker CSS -->
    <link href="{{ asset('lib/bootstrap-datetimepicker/bootstrap-datetimepicker.css') }}" rel="stylesheet">
    {{-- datatables --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/datatables/datatables.min.css') }}" />
    <link rel="stylesheet" href="http://jeremyfagis.github.io/dropify/dist/css/dropify.min.css">
    <script src="{{ asset('lib/jquery/jquery.min.js') }}"></script>
    <title>Calendar App</title>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
<script type="text/javascript" src="{{ asset('js/index.js') }}"></script>
<script type="text/javascript" src="{{ asset('lib/datatables/datatables.min.js') }}"></script>

</html>
