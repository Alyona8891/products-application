import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../../../../../types/types';
import styles from './RegistrationForm.module.scss';
import { insertSchema, passwordSchema } from '../../../../services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { ValidationError } from 'yup';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../../../store/reducers/usersReducer';
import { convertToBase64 } from '../../../../../utils/convertToBase64';

export function RegistrationForm(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IUser> = async (user: IUser): Promise<void> => {
    const image =
      user.image && user.image ? await convertToBase64(user.image[0]) : '';
    dispatch(
      setUsers({
        name: user.name as string,
        age: user.age.toString() as string,
        email: user.email as string,
        password: user.password as string,
        gender: user.gender as string,
        country: user.country as string,
        image: image as string,
      })
    );
    navigate('/main');
  };
  const countries = useSelector((state: RootState) => state.users.countries);

  const [passwordErrors, setPasswordErrors] = useState<string[] | null>(null);

  async function validate(password: string) {
    try {
      const result = await passwordSchema.validate(
        { isUsageNotRequired: true, password },
        { abortEarly: false }
      );
      if (!!result) {
        setPasswordErrors([]);
      }
    } catch (e) {
      const error = e as ValidationError;
      setPasswordErrors(error.errors);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(insertSchema),
  });

  const indicatorClassName = () => {
    if (passwordErrors && passwordErrors.length === 4) {
      return `${styles.indicator}`;
    }
    if (passwordErrors && passwordErrors.length === 3) {
      return `${styles.indicator} ${styles.red}`;
    }
    if (passwordErrors && passwordErrors.length === 2) {
      return `${styles.indicator} ${styles.orange}`;
    }
    if (passwordErrors && passwordErrors.length === 1) {
      return `${styles.indicator} ${styles.salad}`;
    }
    if (passwordErrors && passwordErrors.length === 0) {
      return `${styles.indicator} ${styles.green}`;
    }
    if (!passwordErrors) {
      return `${styles.indicator_none}`;
    }
  };

  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.container}>
            <label className={styles.input_block}>
              Name:
              <input {...register('name')} type={'text'} />
              <p className={styles.error}>{errors.name?.message}</p>
            </label>
            <label className={styles.input_block}>
              Age:
              <input {...register('age')} type={'text'} />
              <p className={styles.error}>{errors.age?.message}</p>
            </label>
            <label className={styles.input_block}>
              Email:
              <input {...register('email')} type={'email'} />
              <p className={styles.error}>{errors.email?.message}</p>
            </label>
            <PasswordInput
              register={register}
              validate={validate}
              errors={passwordErrors}
            />
            <div className={indicatorClassName()}>
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
            </div>
            <label className={styles.input_block}>
              Confirm password:
              <input {...register('confirmPassword')} type={'password'} />
              <p className={styles.error}>{errors.confirmPassword?.message}</p>
            </label>
            <label className={styles.input_block}>
              Gender:
              <select {...register('gender')}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <label className={styles.input_block}>
              Country:
              <input
                {...register('country')}
                list="country"
                type={'text'}
              ></input>
              <datalist id="country">
                {countries.map((country, ndx) => (
                  <option value={country} key={ndx} />
                ))}
              </datalist>
              <p className={styles.error}>{errors.country?.message}</p>
            </label>
            <label className={styles.input_block}>
              Image:
              <span className={styles.button}>Док</span>
              <input
                className={styles.file_input}
                {...register('image')}
                type={'file'}
                accept="image/*"
              />
              <p className={styles.error}>{errors.image?.message}</p>
            </label>
            <label className={styles.input_block}>
              <input {...register('ts')} type="checkbox" />I agree to the terms
              & conditions
              <p className={styles.error}>{errors.ts?.message}</p>
            </label>
          </div>
          <button
            className={styles.submit_button}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
