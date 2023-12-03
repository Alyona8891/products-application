import { useDispatch, useSelector } from 'react-redux';
import styles from './RegistrationForm.module.scss';
import { RootState } from '../../../../store/store';
import { insertSchema } from '../../../../services/schema';
import { ValidationError } from 'yup';
import { FormEvent, FormEventHandler, useRef } from 'react';
import {
  clearErrors,
  setErrors,
} from '../../../../store/reducers/errorsReducer';
import { convertToBase64 } from '../../../../../utils/convertToBase64';
import { setUsers } from '../../../../store/reducers/usersReducer';

export function RegistrationForm(): React.ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    dispatch(clearErrors());
    e.preventDefault();
    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      image: imageRef.current?.value,
      ts: tsRef.current?.checked,
    };
    try {
      const result = await insertSchema.validate(data, { abortEarly: false });
      if (!!result) {
        dispatch(clearErrors());
      }
      const image =
        imageRef.current && imageRef.current.files
          ? convertToBase64(imageRef.current.files[0])
          : '';
      dispatch(
        setUsers({
          name: nameRef.current?.value as string,
          age: ageRef.current?.value as string,
          email: emailRef.current?.value as string,
          password: passwordRef.current?.value as string,
          gender: genderRef.current?.value as string,
          country: countryRef.current?.value as string,
          image: image as string,
        })
      );
    } catch (e) {
      const error = e as ValidationError;
      dispatch(setErrors(error.inner));
    }
  };
  const countries = useSelector((state: RootState) => state.users.countries);
  const errors = useSelector((state: RootState) => state.errors.errors);
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tsRef = useRef<HTMLInputElement>(null);

  const indicatorClassName = () => {
    if (errors.password && errors.password.length === 4) {
      return `${styles.indicator}`;
    }
    if (errors.password && errors.password.length === 3) {
      return `${styles.indicator} ${styles.red}`;
    }
    if (errors.password && errors.password.length === 2) {
      return `${styles.indicator} ${styles.orange}`;
    }
    if (errors.password && errors.password.length === 1) {
      return `${styles.indicator} ${styles.salad}`;
    }
    if (errors.password && errors.password.length === 0) {
      return `${styles.indicator} ${styles.green}`;
    }
    if (!errors.password) {
      return `${styles.indicator_none}`;
    }
  };

  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.container}>
            <label className={styles.input_block}>
              Name:
              <input ref={nameRef} type={'text'} />
              {errors.name.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              Age:
              <input ref={ageRef} type={'text'} />
              {errors.age.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              Email:
              <input ref={emailRef} type={'email'} />
              {errors.email.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              Password:
              <input ref={passwordRef} type={'password'} />
              {errors.password &&
                errors.password.map((el, ndx) => {
                  return (
                    <p className={styles.error} key={ndx}>
                      {el}
                    </p>
                  );
                })}
            </label>
            <div className={indicatorClassName()}>
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
              <div className={styles.inner_indicator} />
            </div>
            <label className={styles.input_block}>
              Confirm password:
              <input ref={confirmPasswordRef} type={'password'} />
              {errors.confirmPassword.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              Gender:
              <select ref={genderRef}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <label className={styles.input_block}>
              Country:
              <input ref={countryRef} list="country" type={'text'}></input>
              <datalist id="country">
                {countries.map((country, ndx) => (
                  <option value={country} key={ndx} />
                ))}
              </datalist>
              {errors.country.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              Image:
              <span className={styles.button}>Док</span>
              <input
                ref={imageRef}
                className={styles.file_input}
                type={'file'}
                accept="image/*"
              />
              {errors.image.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
            <label className={styles.input_block}>
              <input ref={tsRef} type="checkbox" />I agree to the terms &
              conditions
              {errors.ts.map((el, ndx) => {
                return (
                  <p className={styles.error} key={ndx}>
                    {el}
                  </p>
                );
              })}
            </label>
          </div>
          <button className={styles.submit_button} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
