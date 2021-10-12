<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\Assert;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    private Model $admin;

    public function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->admin()->create();
    }

    /** @test */
    public function non_user_get_routed_to_login(): void
    {
        $this->get('/user')->assertRedirect('/login');
    }

    /** @test */
    public function non_admin_user_can_only_access_their_account(): void
    {
        $user = User::factory()->create();
        $loggedIn = $this->actingAs($user);

        $loggedIn->patch("/user/{$user->id}")->assertStatus(302);
        $loggedIn->get("/user/{$user->id}")->assertStatus(200);

        $loggedIn->patch("/user/{$this->admin->id}")->assertStatus(403);
        $loggedIn->get("/user/{$this->admin->id}")->assertStatus(403);

        $loggedIn->get('/user')->assertStatus(403);
        $loggedIn->get('/user/create')->assertStatus(403);
        $loggedIn->post('/user')->assertStatus(403);
        $loggedIn->delete("/user/{$user->id}")->assertStatus(403);
    }

    /** @test */
    public function can_list_all_user(): void
    {
        User::factory()->count(10)->create();
        $this->actingAs($this->admin)->get('/user');

        $this->get('/user')
            ->assertInertia(fn(Assert $page) => $page
                ->component('User/Index')
                ->has('users', 11));
    }

    /** @test */
    public function can_store_a_user(): void
    {
        $response = $this
            ->actingAs($this->admin)
            ->from('/user')
            ->post('/user', [
                'name' => 'Sally Gene',
                'email' => 'sallyjene@gmail.com',
                'address' => '14321 Example Street',
                'address2' => 'Apt 132',
                'city' => 'Houston',
                'state' => 'TX',
                'zip' => '75632',
                'phone' => '5126987896'
            ]);

        $response->assertRedirect('user');
        $this->assertDatabaseHas('users', [
            'name' => 'Sally Gene',
            'email' => 'sallyjene@gmail.com',
            'address' => '14321 Example Street',
            'address2' => 'Apt 132',
            'city' => 'Houston',
            'state' => 'TX',
            'zip' => '75632',
            'phone' => '5126987896',
            'is_admin' => 0,
            'email_verified_at' => null,
        ]);
    }

    /** @test */
    public function storing_a_user_protects_sensitive_fields(): void
    {
        $response = $this->actingAs($this->admin)->from('/user')->post('/user', [
            'name' => 'Sally Gene',
            'email_verified_at' => now(),
        ]);

        $response->assertRedirect('user')
            ->assertSessionHas('message', 'User Created Successfully.');

        $this->assertDatabaseHas('users', [
            'name' => 'Sally Gene',
            'email_verified_at' => null,
        ]);
    }

    /** @test */
    public function getting_a_use_retrieves_relevant_records(): void
    {
        $this->actingAs($this->admin)->get('/user');

        $response = $this->get("/user/{$this->admin->id}");

        $response->assertInertia(fn(Assert $page) => $page
            ->component('User/Show')
            ->has('user'));
    }

    /** @test */
    public function can_update_a_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from('/user')
            ->put("/user/{$user->id}", [
                'name' => 'New Name',
                'is_admin' => 1
            ]);

        $response->assertRedirect('user')
            ->assertSessionHas('message', 'User Updated Successfully.');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'New Name',
            'is_admin' => 1,
        ]);
    }

    /** @test */
    public function can_delete_a_user(): void
    {
        $response = $this->actingAs($this->admin)
            ->from('/user')
            ->delete("/user/{$this->admin->id}");

        $response->assertRedirect('user')
            ->assertSessionHas('message', 'User Deleted Successfully.');

        $this->assertSoftDeleted($this->admin);
    }
}
