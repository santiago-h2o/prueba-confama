import styles from './Register.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';

function Register() {
  return (
    <div className={styles['register']}>
      <h1 className={styles['register__title']}>Crear cuenta</h1>
      <AuthForm isLogin={false} />
    </div>
  );
}

export default Register;
