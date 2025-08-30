import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';
import { BrowserRouter } from 'react-router-dom';
import * as authActions from '../../actions/auth/auth';

jest.mock('../../actions/auth/auth', () => ({
  handleLogin: jest.fn(),
  handleCreateEmployee: jest.fn()
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('AuthForm', () => {
  test('muestra campos para login', () => {
    renderWithRouter(<AuthForm isLogin={true} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/rol/i)).not.toBeInTheDocument();
  });

  test('muestra campos para registro', () => {
    renderWithRouter(<AuthForm isLogin={false} />);

    expect(screen.getByLabelText(/rol/i)).toBeInTheDocument();
  });

  test('llama a handleLogin al enviar login', async () => {
    authActions.handleLogin.mockResolvedValue({ status: 200, data: 'fakeToken', message: 'ok' });

    renderWithRouter(<AuthForm isLogin={true} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'juan' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    expect(authActions.handleLogin).toHaveBeenCalledWith({ name: 'juan', password: '1234' });
  });
});
