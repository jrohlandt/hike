<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd('hello');
        return view('admin.index');
    }

}
