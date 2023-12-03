import { UseFormRegister } from 'react-hook-form';
import { IUser } from '../../../../../types/types';
import styles from './PasswordInput.module.scss';

export function PasswordInput(props: {
  register: UseFormRegister<IUser>;
  validate: (password: string) => Promise<void>;
  errors: string[] | null;
}): React.ReactElement {
  const { register, validate, errors } = props;
  const input = register('password');
  const { onChange, ref, name } = input;
  return (
    <label className={styles.input_block}>
      Password:
      <input
        className={styles.input}
        onChange={async (e) => {
          validate(e.target.value).then(() => {
            onChange(e);
          });
        }}
        ref={ref}
        name={name}
        type={'password'}
      />
      {errors && (
        <div className={styles.errors_block}>
          {errors.map((e, idx) => (
            <p className={styles.error} key={idx}>
              {e}
            </p>
          ))}
        </div>
      )}
    </label>
  );
}
