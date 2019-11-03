<?php

namespace Tests\Feature;

use App\Appointment;
use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AppointmentTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test if users can view appointments
     *
     * @return void
     */
    public function testUsersViewAppointments()
    {

        $user = factory(User::class)->create();

        factory(Appointment::class, 10)->create([
            'user_id' => $user->id,
            'start' => now(),
            'end' => now()->addHour(3)
        ]);

        $start = now();
        $end = now()->addHour(2);
        $view = 'appointments';

        $this->actingAs($user, 'users')->get("/api/appointments?start=$start&end=$end&view=$view")->assertJsonStructure([
            'status',
            'appointments'
        ])->assertStatus(200);
    }

    /**
     * Test if users can create an appointment
     *
     * @return void
     */
    public function testUsersCanCreateAppointment()
    {
        $user = factory(User::class)->create();

        $data = $this->data();

        $this->actingAs($user, 'users')->post('/api/appointment/create', $data)->assertJson([
            'status' => 'success',
            'message' => 'Appointment created successfully'
        ])->assertStatus(200);

        $this->assertCount(1, $user->refresh()->appointments);

        $this->assertDatabaseHas(
            'appointments',
            [
                'user_id' => $user->id,
                'title' => $data['title'],
                'description' => $data['description'],
                'start' => Carbon::parse($data['start'])->toDateTimeString(),
                'end' => Carbon::parse($data['end'])->toDateTimeString()
            ]
        );
    }

    /**
     * Test if users can import an appointments
     *
     * @return void
     */
    public function testUsersCanImportAppointments()
    {
        $user = factory(User::class)->create();

        $date = $this->faker->dateTime();

        $data = [
            [
                'Title' => $this->faker->word,
                'Description' => $this->faker->paragraph,
                'Start' => Carbon::parse($date)->addMonth(1)->toDateTimeString(),
                'End' => Carbon::parse($date)->addMonth(1)->addHour(3)->toDateTimeString()
            ],
            [
                'Title' => $this->faker->word,
                'Description' => $this->faker->paragraph,
                'Start' => Carbon::parse($date)->addMonth(2)->toDateTimeString(),
                'End' => Carbon::parse($date)->addMonth(2)->addHour(3)->toDateTimeString()
            ],
            [
                'Title' => $this->faker->word,
                'Description' => $this->faker->paragraph,
                'Start' => Carbon::parse($date)->addMonth(3)->toDateTimeString(),
                'End' => Carbon::parse($date)->addMonth(3)->addHour(3)->toDateTimeString()
            ],
        ];

        $this->actingAs($user, 'users')->post('/api/appointments', [
            'appointments' => json_encode($data)
        ])->assertJson([
            'status' => 'success',
            'message' => count($data) . ' Appointment(s) imported successfully'
        ])->assertStatus(200);

        $this->assertCount(3, $user->refresh()->appointments);
    }

    /**
     * Test that users cannot import overlapping appointments
     *
     * @return void
     */
    public function testUsersCanNotImportOverlappingAppointments()
    {
        $user = factory(User::class)->create();

        $date = $this->faker->dateTime();

        $data = [
            [
                'Title' => $this->faker->word,
                'Description' => $this->faker->paragraph,
                'Start' => Carbon::parse($date)->addMonth(1)->toDateTimeString(),
                'End' => Carbon::parse($date)->addMonth(1)->addHour(3)->toDateTimeString()
            ],
            [
                'Title' => $this->faker->word,
                'Description' => $this->faker->paragraph,
                'Start' => Carbon::parse($date)->addMonth(1)->toDateTimeString(),
                'End' => Carbon::parse($date)->addMonth(1)->addHour(3)->toDateTimeString()
            ],
        ];

        $this->actingAs($user, 'users')->post('/api/appointments', [
            'appointments' => json_encode($data)
        ])->assertJson([
            'status' => 'error',
            'message' => 'An appointment has already been scheduled for this period on row 3'
        ])->assertStatus(400);
    }

    /**
     * Test importing appointments validation
     *
     * @return void
     */
    public function testUsersImportValidations()
    {
        $user = factory(User::class)->create();

        $data = [];

        $this->actingAs($user, 'users')->post('/api/appointments', [
            'appointments' => json_encode($data)
        ])->assertJson([
            'status' => 'error',
            'message' => 'No data found'
        ])->assertStatus(404);
    }

    /**
     * Test that users cannot create overlapping appointments
     *
     * @return void
     */
    public function testUsersCanNotCreateOverlappingAppointment()
    {
        $user = factory(User::class)->create();

        $data = $this->data();

        factory(Appointment::class)->create([
            'user_id' => $user->id,
            'start' => Carbon::parse($data['start'])->add(1, 'hour')->toDateTimeString(),
            'end' => Carbon::parse($data['end'])->add(2, 'hour')->toDateTimeString(),
        ]);

        $start = Carbon::parse($data['start'])->add(1, 'hour')->toDateTimeString();
        $end = Carbon::parse($data['end'])->add(1, 'hour')->toDateTimeString();

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['start' => $start, 'end' => $end]))->assertJson([
            'status' => 'error',
            'message' => 'An appointment has already been scheduled for this period'
        ])->assertStatus(400);

        $start = Carbon::parse($data['start'])->add(2, 'hour')->toDateTimeString();
        $end = Carbon::parse($data['end'])->add(4, 'hour')->toDateTimeString();

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['start' => $start, 'end' => $end]))->assertJson([
            'status' => 'error',
            'message' => 'An appointment has already been scheduled for this period'
        ])->assertStatus(400);
    }

    /**
     * Test if appointment validations are accurate
     *
     * @return void
     */
    public function testAppointmentValidations()
    {
        $user = factory(User::class)->create();

        $data = $this->data();

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['title' => '']))->assertJson([
            'status' => 'error',
            'message' => 'The title field is required.'
        ])->assertStatus(422);

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['start' => '']))->assertJson([
            'status' => 'error',
            'message' => 'The start field is required.'
        ])->assertStatus(422);

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['start' => Str::random(2)]))->assertJson([
            'status' => 'error',
            'message' => 'The start is not a valid date.'
        ])->assertStatus(422);

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['end' => '']))->assertJson([
            'status' => 'error',
            'message' => 'The end field is required.'
        ])->assertStatus(422);

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['end' => Str::random(2)]))->assertJson([
            'status' => 'error',
            'message' => 'The end is not a valid date.'
        ])->assertStatus(422);

        $this->actingAs($user, 'users')->post('/api/appointment/create', array_merge($data, ['start' => now(), 'end' => now()]))->assertJson([
            'status' => 'error',
            'message' => 'The end must be a date after start.'
        ])->assertStatus(422);
    }

    /**
     * Test if users can view an appointment
     *
     * @return void
     */
    public function testUsersViewAnAppointment()
    {
        $user = factory(User::class)->create();

        $appointment = factory(Appointment::class)->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user, 'users')->get("/api/appointment/$appointment->uuid")->assertJson([
            'status' => 'success',
            'appointment' => $appointment->toArray()
        ])->assertStatus(200);
    }

    /**
     * Test that a user cannot view another user's appointment
     *
     * @return void
     */
    public function testUsersCanNotViewAnotherPersonsAppointment()
    {
        $user = factory(User::class)->create();

        $appointment = factory(Appointment::class)->create();

        $this->actingAs($user, 'users')->get("/api/appointment/$appointment->uuid")->assertJson([
            'status' => 'error',
            'message' => 'Appointment not found'
        ])->assertStatus(404);
    }

    /**
     * Test if users can update an appointment
     *
     * @return void
     */
    public function testUsersCanUpdateAnAppointment()
    {
        $user = factory(User::class)->create();

        $data = $this->data();

        $appointment = factory(Appointment::class)->create([
            'user_id' => $user->id,
            'start' => Carbon::parse($data['start'])->toDateTimeString(),
            'end' => Carbon::parse($data['end'])->toDateTimeString(),
        ]);

        $this->actingAs($user, 'users')->put("/api/appointment/$appointment->uuid", $data)->assertJson([
            'status' => 'success',
            'message' => 'Appointment updated successfully.'
        ])->assertStatus(200);

        $appointment = $appointment->refresh();

        $this->assertEquals($appointment->title, $data['title']);
        $this->assertEquals($appointment->description, $data['description']);
        $this->assertEquals($appointment->start, Carbon::parse($data['start'])->toDateTimeString());
        $this->assertEquals($appointment->end, Carbon::parse($data['end'])->toDateTimeString());

        $this->assertDatabaseHas(
            'appointments',
            [
                'user_id' => $user->id,
                'title' => $data['title'],
                'description' => $data['description'],
                'start' => Carbon::parse($data['start'])->toDateTimeString(),
                'end' => Carbon::parse($data['end'])->toDateTimeString()
            ]
        );
    }

    /**
     * Test if users can delete an appointment
     *
     * @return void
     */
    public function testUsersCanDeleteAnAppointment()
    {
        $user = factory(User::class)->create();

        $appointment = factory(Appointment::class)->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user, 'users')->delete("/api/appointment/$appointment->uuid")->assertJson([
            'status' => 'success',
            'message' => 'Appointment deleted successfully.'
        ])->assertStatus(200);

        $this->assertDatabaseMissing(
            'appointments',
            [
                'user_id' => $user->id,
                'title' => $appointment->title,
                'description' => $appointment->description,
                'start' => $appointment->start,
                'end' => $appointment->end
            ]
        );
    }

    /**
     * Valid data for testing
     *
     * @return array
     */
    public function data()
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'start' => now()->addDay(1)->toDateTimeString(),
            'end' => now()->addDay(1)->addHour(1)->toDateTimeString()
        ];
    }
}
