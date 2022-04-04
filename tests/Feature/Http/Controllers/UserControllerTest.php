<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
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
        $this->get('/users')->assertRedirect('/login');
    }

    /** @test */
    public function non_admin_user_can_only_access_their_account(): void
    {
        $user = User::factory()->create();
        $loggedIn = $this->actingAs($user);

        $loggedIn->patch("/users/{$user->id}")->assertStatus(302);
        $loggedIn->get("/users/{$user->id}")->assertStatus(200);

        $loggedIn->patch("/users/{$this->admin->id}")->assertStatus(403);
        $loggedIn->get("/users/{$this->admin->id}")->assertStatus(403);

        $loggedIn->get('/users')->assertStatus(403);
        $loggedIn->post('/users')->assertStatus(403);
        $loggedIn->delete("/users/{$user->id}")->assertStatus(403);
    }

    /** @test */
    public function can_list_all_user(): void
    {
        User::factory()->count(10)->create();
        $this->actingAs($this->admin)->get('/users');

        $this->get('/users')
            ->assertInertia(fn(Assert $page) => $page
                ->component('User/Index')
                ->has('users', 11));
    }

    /** @test */
    public function can_store_a_user(): void
    {
        $response = $this
            ->actingAs($this->admin)
            ->from('/users')
            ->post('/users', [
                'name' => 'Sally Gene',
                'email' => 'sallyjene@gmail.com',
                'address' => '14321 Example Street',
                'address2' => 'Apt 132',
                'city' => 'Houston',
                'state' => 'TX',
                'zip' => '75632',
                'phone' => '5126987896'
            ]);

        $response->assertRedirect('users');
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
        $response = $this->actingAs($this->admin)->from('/users')->post('/users', [
            'name' => 'Sally Gene',
            'email_verified_at' => now(),
        ]);

        $response->assertRedirect('users')
            ->assertSessionHas('message', 'User Created Successfully.');

        $this->assertDatabaseHas('users', [
            'name' => 'Sally Gene',
            'email_verified_at' => null,
        ]);
    }

    /** @test */
    public function getting_a_user_retrieves_relevant_records(): void
    {
        $this->actingAs($this->admin)->get('/users');

        $response = $this->get("/users/{$this->admin->id}");

        $response->assertInertia(fn(Assert $page) => $page
            ->component('User/Show')
            ->has('user'));
    }

    /** @test */
    public function can_update_a_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->admin)
            ->from('/users')
            ->put("/users/{$user->id}", [
                'name' => 'New Name',
                'is_admin' => 1
            ]);

        $response->assertRedirect('users')
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
            ->from('/users')
            ->delete("/users/{$this->admin->id}");

        $response->assertRedirect('users')
            ->assertSessionHas('message', 'User Deleted Successfully.');

        $this->assertSoftDeleted($this->admin);
    }
}
