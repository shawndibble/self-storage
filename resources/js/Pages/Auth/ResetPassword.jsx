import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

// eslint-disable-next-line react/prop-types
export default function ResetPassword({ token, email }) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => () => {
    reset('password', 'password_confirmation');
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post('/reset-password');
  };

  return (
    <Guest>
      <Head title="Reset Password" />

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" />

          <Input
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password_confirmation" value="Confirm Password" />

          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            handleChange={onHandleChange}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className="ml-4" processing={processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </Guest>
  );
}
