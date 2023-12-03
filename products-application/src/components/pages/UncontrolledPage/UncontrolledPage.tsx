import { RegistrationForm } from './components/RegistrationForm/UncontrolledRegistrationForm';
import { Header } from '../../UI/Header/Header';

export function UncontrolledPage(): React.ReactElement {
  return (
    <>
      <Header />
      <RegistrationForm />
      <footer />
    </>
  );
}
