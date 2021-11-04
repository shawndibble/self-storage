<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController
{
    public function __invoke()
    {
        return Inertia::render('Dashboard', [
            'monthlySales' => DB::table('payments')
                ->selectRaw('year(paid_at) as year ,month(paid_at) as month, sum(amount) as total')
                ->where('paid_at', '>=', Carbon::now()->startOfMonth()->subYear())
                ->groupByRaw('year(paid_at),month(paid_at)')
                ->orderByRaw('year(paid_at),month(paid_at)')
                ->get(),
        ]);
    }
}
