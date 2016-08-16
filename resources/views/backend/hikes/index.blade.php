@extends('backend.layouts.default')

@section('title', 'Hikes')

@section('content')
    <h3>hike breadcrumbs</h3>
    <hikes-list></hikes-list>
@endsection

@section('scripts')
    <script src="/js/build.js"></script>
@endsection
