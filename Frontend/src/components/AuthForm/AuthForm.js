import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';
import { handleCreateUser, handleLogin } from '../../actions/auth/auth';
import { useDispatch } from "react-redux";
import { setInfoUser } from '../../hooks/redux/authSlice';
import Swal from 'sweetalert2';

function AuthForm({ isLogin }) {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const { status, data } = await handleLogin({ name, password });

      if (status === 200) {
        dispatch(setInfoUser({
          token: data,
          name,
          isLogged: true
        }));
        navigate('/');
      }
    } else {
      const { status } = await handleCreateUser({ name, password });
      if (status === 200) {
        Swal.fire({
          title: "Te has registrado con éxito",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        }).then(() => {
          navigate('/login');
        });
      }
    }
  };

  return (
    <form className={styles['auth-form']} onSubmit={handleSubmit}>
      <div className={styles['auth-form__group']}>
        <label className={styles['auth-form__label']}>Nombre</label>
        <input
          className={styles['auth-form__input']}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles['auth-form__group']}>
        <label className={styles['auth-form__label']}>Contraseña</label>
        <input
          className={styles['auth-form__input']}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className={styles['auth-form__button']} type="submit">
        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>
    </form>
  );
}

export default AuthForm;
