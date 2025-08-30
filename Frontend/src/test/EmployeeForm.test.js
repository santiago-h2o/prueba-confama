import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';

describe('EmployeeForm', () => {
  test('llama a onCreate con los datos correctos', () => {
    const onCreate = jest.fn();
    const onClose = jest.fn();

    render(<EmployeeForm onCreate={onCreate} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByPlaceholderText(/rol/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/salario/i), { target: { value: 'EmpresaX' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: 'EmpresaX' } });

    fireEvent.submit(screen.getByRole('button', { name: /crear empleado/i }));

    expect(onCreate).toHaveBeenCalledWith({
      name: 'Ana',
      role: 'admin',
      company: 'EmpresaX'
    });

    expect(onClose).toHaveBeenCalled();
  });
});
