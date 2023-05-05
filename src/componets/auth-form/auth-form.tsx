import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import InputError from '../input-error/input-error';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@firebase/auth';
import { useState } from 'react';
import { FirebaseError } from '@firebase/util';

interface FormInputs {
  email: string;
  password: string;
}

type AuthMode = 'sign-in' | 'sign-up';

interface AuthFormProps {
  mode: AuthMode;
}

const eMailValidationRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

const AuthForm = ({ mode }: AuthFormProps) => {
  const [error, setError] = useState<string>('');

  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    setError('');
    try {
      if (mode === 'sign-in') {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === 'sign-up') {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/graphiql');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          autoComplete="off"
          className={`${watch('email') ? 'active' : ''} ${errors.email ? 'error' : ''}`}
          type="text"
          {...register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: { value: eMailValidationRegEx, message: 'Enter valid E-mail' },
          })}
        />
        <span className="input-label">E-mail</span>
        {errors.email && <InputError message={errors.email.message} />}
      </div>
      <div>
        <input
          className={`${watch('password') ? 'active' : ''} ${errors.password ? 'error' : ''}`}
          type="password"
          {...register('password', {
            required: { value: true, message: 'Password is required' },
            pattern: {
              value: passwordRegEx,
              message: 'Should contain at least one letter, one digit, one special character',
            },
            minLength: { value: 8, message: 'Should be at least 8 chars' },
          })}
        />
        <span className="input-label">Password</span>
        {errors.password && <InputError message={errors.password.message} />}
      </div>
      <input type="submit" value={'Submit'} />
      {error && <div className="submit-error">{error}</div>}
    </form>
  );
};

export default AuthForm;
