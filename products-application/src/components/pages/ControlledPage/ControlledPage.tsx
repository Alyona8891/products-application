import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { Header } from '../../UI/Header/Header';

export function ControlledPage(): React.ReactElement {
  return (
    <>
      <Header />
      <RegistrationForm />
      <footer />
    </>
  );
}
