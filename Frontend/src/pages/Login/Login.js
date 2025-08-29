import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';

function Login() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');

  };

  return (
    <div className={styles['login']}>
      <h1 className={styles['login__title']}>Iniciar sesión</h1>
      <AuthForm isLogin={true} />
      <button
        className={styles['login__register-button']}
        onClick={goToRegister}
      >
        Registrarse
      </button>
    </div>
  );
}

export default Login;
