<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests\TrailDefaultRequest;
use App\Http\Controllers\Controller;
use App\Models\Trail as Model;

use DB;

class TrailsController extends Controller
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            return $this->model
                        ->orderBy('name', 'asc')
                        ->paginate(10);
        }

        return view('admin.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TrailDefaultRequest $request)
    {
        $this->model->create([
            'name' => $request->name,
            'distance' => $request->distance,
            'description' => $request->description,
        ]);
        return response()->json(['status' => 200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if ($request->ajax()) {
            $items = $this->model->find($id);
            $severities = DB::table('severities')->get();
            $exposures = DB::table('exposures')->get();
            return response()->json(compact('items', 'severities', 'exposures'));
        }

        return view('admin.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('admin.index');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TrailDefaultRequest $request, $id)
    {
        if ($item = $this->model->find($id)) {
            $item->name = $request->name;
            $item->distance = $request->distance;
            $item->severity_id = $request->severity_id;
            $item->exposure_id = $request->exposure_id;
            $item->elevation_min = $request->elevation_min;
            $item->elevation_max = $request->elevation_max;
            $item->description = $request->description;

            $item->save();

            return response()->json(['status' => 200]);
        }

        return response()->json(['status' => 404]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
