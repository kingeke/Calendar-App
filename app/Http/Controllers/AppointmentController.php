<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Http\Traits\CustomTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    use CustomTraits;

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if ($this->user = Auth::guard('users')->user()) {

                //auto mark completed appointments
                $this->user->appointments()->where('end', '<', now()->toDateTimeString())->get()->each(function ($appointment) {
                    $appointment->update(['completed' => true]);
                });

                return $next($request);
            } else {
                return $this->responseCodes('error', 'You are not authorized to be here.', 401);
            }
        });
    }

    /**
     * View all appointment
     * 
     * @param date $start
     * 
     * @param date $end
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $view = $request->view;

        $appointments = $this->user->appointments()
            ->orderBy('completed', 'asc')
            ->orderBy('start', 'asc')
            ->whereBetween('start', [$request->start, $request->end])
            ->get();

        if ($view == 'month') {
            $appointments = $appointments->groupBy(function ($appointment) {
                return $appointment->start->format('d');
            });
        } else if ($view == 'week') {
            $appointments = $appointments->groupBy(function ($appointment) {
                return $appointment->start->format('D d/m');
            });
        }

        return response()->json([
            'status' => 'success',
            'appointments' => $appointments
        ]);
    }

    /**
     * Create an appointment
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function create(AppointmentRequest $request)
    {
        $user = $this->user;

        if (now()->toDateTimeString() > $request->start) {
            return $this->responseCodes('error', 'The selected period is in the past.', 400);
        }

        if ($user->checkForOverlappingAppointments($request->start, $request->end)) {
            return $this->responseCodes('error', 'An appointment has already been scheduled for this period', 400);
        }

        $this->user->appointments()->create($request->all());

        return $this->responseCodes('success', 'Appointment created successfully');
    }

    /**
     * Import user appointments
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function import(Request $request)
    {
        $user = $this->user;

        $appointments = json_decode($request->appointments, true);

        if (!$appointments || ($appointments && count($appointments) == 0)) {
            return $this->responseCodes('error', 'No data found', 404);
        }

        $no = 0;

        foreach ($appointments as $data) {

            $currentRow = $no + 2;

            try {

                if ($user->checkForOverlappingAppointments($data['Start'], $data['End'])) {
                    return $this->responseCodes('error', "An appointment has already been scheduled for this period on row $currentRow", 400);
                }

                $user->appointments()->create([
                    'title' => $data['Title'],
                    'description' => $data['Description'] ?? null,
                    'start' => $data['Start'],
                    'end' => $data['End']
                ]);

                $no++;
            } catch (\Exception $e) {

                return $this->responseCodes('error',  "There is an issue on row $currentRow if this isn't the first data on the excel sheet, the data above has been imported " . $e->getMessage());
            }
        }

        return $this->responseCodes('success', "$no Appointment(s) imported successfully");
    }

    /**
     * View an appointment
     * 
     * @param string $uuid
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function view($uuid)
    {
        $appointment = $this->user->appointments()->where('uuid', $uuid)->first();

        if (!$appointment) {
            return $this->notFound('Appointment');
        }

        return response()->json([
            'status' => 'success',
            'appointment' => $appointment
        ]);
    }

    /**
     * Edit an appointment
     * 
     * @param string $uuid
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function update($uuid, AppointmentRequest $request)
    {
        $user = $this->user;

        $appointment = $user->appointments()->where('uuid', $uuid)->first();

        if (!$appointment) {
            return $this->notFound('Appointment');
        }

        if ($appointment->completed) {
            return $this->responseCodes('error', 'You can not edit a completed appointment.', 400);
        }

        if (now()->toDateTimeString() > $request->start) {
            return $this->responseCodes('error', 'The selected period is in the past.', 400);
        }

        if ($user->checkForOverlappingAppointments($request->start, $request->end, $uuid)) {
            return $this->responseCodes('error', 'An appointment has already been scheduled for this period', 400);
        }

        $appointment->update($request->all());

        return $this->responseCodes('success', 'Appointment updated successfully.');
    }

    /**
     * Delete an appointment
     * 
     * @param string $uuid
     * 
     * @return Illuminate\Http\JsonResponse
     */
    public function destroy($uuid)
    {
        $appointment = $this->user->appointments()->where('uuid', $uuid)->first();

        if (!$appointment) {
            return $this->notFound('Appointment');
        }

        $appointment->delete();

        return $this->responseCodes('success', 'Appointment deleted successfully.');
    }
}
