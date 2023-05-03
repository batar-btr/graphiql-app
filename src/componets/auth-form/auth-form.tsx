import { useForm, SubmitHandler } from 'react-hook-form';
import './index.scss';
import InputError from '../input-error/input-error';

interface FormInputs {
  email: string;
  password: string;
}

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          autoComplete="off"
          className={`${watch('email') ? 'active' : ''} ${errors.email ? 'error' : ''}`}
          type="text"
          {...register('email', { required: { value: true, message: 'Email is required' } })}
        />
        <span className="input-label">E-mail</span>
        {errors.email && <InputError message={errors.email.message} />}
      </div>
      <div>
        <input
          className={`${watch('password') ? 'active' : ''} ${errors.password ? 'error' : ''}`}
          type="password"
          {...register('password', { required: { value: true, message: 'Password is required' } })}
        />
        <span className="input-label">Password</span>
        {errors.password && <InputError message={errors.password.message} />}
      </div>
      <input type="submit" value={'Submit'} />
    </form>
  );
};

export default AuthForm;
