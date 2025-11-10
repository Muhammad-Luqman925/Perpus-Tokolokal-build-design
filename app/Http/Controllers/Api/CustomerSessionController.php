<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerSessionController extends Controller
{
    public function index()
    {
        $sessions = CustomerSession::where('customer_id', Auth::id())
            ->orderByDesc('last_active_at')
            ->get();

        return response()->json([
            'success' => true,
            'sessions' => $sessions,
        ]);
    }

    public function logoutSession($id)
    {
        $session = CustomerSession::where('customer_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $session->delete();

        return response()->json(['message' => 'Session logged out successfully']);
    }

    public function logoutAll()
    {
        CustomerSession::where('customer_id', Auth::id())->delete();
        return response()->json(['message' => 'All sessions logged out']);
    }
}
