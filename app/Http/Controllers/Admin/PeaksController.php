<?php

namespace App\Http\Controllers\Admin;

use Storage;
use Illuminate\Http\Request;

use App\Http\Requests\PeakDefaultRequest as DefaultRequest;
use App\Http\Controllers\Controller;
use App\Models\Peak as Model;

use DB;

class PeaksController extends Controller
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
            $exposures = DB::table('exposures')->get();
            return response()->json(compact('exposures'));
        }
        return view('admin.index');
    }

    public function store(DefaultRequest $request)
    {
        // Create Success
        $exclude = ['id', 'exposures', 'thumbnailPath', 'validationErrors'];
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
                'text' => 'gateway timeout',
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
            $exposures = DB::table('exposures')->get();
            return response()->json(compact('items', 'exposures'));
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

    public function uploadThumbnail(Request $request, $id)
    {
        if (!$request->hasFile('thumbnail') || !$request->file('thumbnail')->isValid()) {
            return response()->json([
                'response_status' => [
                    'code' => 404,
                    'text' => 'not found',
                    'message' => 'The image is either invalid or does not exist',
                ],
                'body' => [],
            ]);
        }

        if (!$item = $this->model->find($id)) {
            return response()->json([
                'response_status' => [
                    'code' => 404,
                    'text' => 'not found',
                    'message' => 'a Peak with id '.$id.' could not be found.',
                ],
                'body' => [],
            ]);
        }

        $thumbnail = $request->file('thumbnail');
        if (in_array($thumbnail->getClientMimeType(), ['image/png', 'image/jpeg', 'image/gif'])) {
            $ext = $thumbnail->extension();
            $filename = md5(str_random(30));
            $storagePath = public_path().'/images/peaks/thumbnails';
            $thumbnail->move($storagePath, $filename.'.'.$ext);
            $item->thumbnail = $filename.'.'.$ext;
            $item->save();
            $response = [
                'response_status' => [
                    'code' => 200,
                    'text' => 'ok',
                    'message' => 'success',
                ],
                'body' => ['thumbnail' => $filename.'.'.$ext],
            ];
            return response()->json($response);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\DefaultRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DefaultRequest $request, $id)
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
        $exclude = ['id', 'exposures' ,'thumbnail', 'thumbnailPath', 'validationErrors'];
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

        // Delete Success
        if ($item->delete()) {
            $response = [
                'response_status' => [
                    'code' => 200,
                    'text' => 'ok',
                    'message' => 'success',
                ],
                'body' => [],
            ];
            return response()->json($response);
        }

        // Delete failed
        $response = [
            'response_status' => [
                'code' => 504,
                'text' => 'ok',
                'message' => 'The server is up but, the delete failed',
            ],
            'body' => $item,
        ];

    }
}
