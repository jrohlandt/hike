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
        if ($request->ajax())
            return $this->model->orderBy('name', 'asc')->paginate(10);

        return view('admin.index');
    }

    public function create(Request $request)
    {
        if ($request->ajax()) {
            $severities = DB::table('severities')->get();
            $exposures = DB::table('exposures')->get();
            return response()->json(compact('severities', 'exposures'));
        }

        return view('admin.index');
    }

    public function store(TrailDefaultRequest $request)
    {
        // $this->model->create($request->only('name', 'distance', 'description'));
        // return response()->json(['status' => 200]);

        // Create Success
        $exclude = ['id', 'severities', 'exposures', 'validationErrors'];
        // dd($request->except($exclude));
        if ($item = $this->model->create($request->except($exclude))) {
            $response = [
                'response_status' => [
                    'code' => 200,
                    'text' => 'ok',
                    'message' => 'success',
                ],
                'body' => $item,
            ];
            return response()->json($response);
        }

        // Create failed
        $response = [
            'response_status' => [
                'code' => 504,
                'text' => 'ok',
                'message' => 'The server is up but, the create failed',
            ],
            'body' => [],
        ];

        return response()->json($response);
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
     * @param  App\Http\Requests\TrailDefaultRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TrailDefaultRequest $request, $id)
    {
        // Not found
        if (!$item = $this->model->find($id)) {
            return response()->json([
                'response_status' => [
                    'code' => 404,
                    'text' => 'not found',
                    'message' => 'The requested resource was not found',
                ],
                'body' => [],
            ]);
        }

        // Update Success
        $exclude = ['id', 'severities', 'exposures', 'validationErrors'];
        if ($this->model->where('id', $id)->update($request->except($exclude))) {
            $updatedItem = $this->model->find($id);
            $response = [
                'response_status' => [
                    'code' => 200,
                    'text' => 'ok',
                    'message' => 'success',
                ],
                'body' => $updatedItem,
            ];
            return response()->json($response);
        }

        // Update failed
        $response = [
            'response_status' => [
                'code' => 504,
                'text' => 'ok',
                'message' => 'The server is up but, the update failed',
            ],
            'body' => $item,
        ];

        return response()->json($response);
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
