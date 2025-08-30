import { render, screen, fireEvent } from '@testing-library/react';
import SolicitudeForm from './SolicitudeForm';
import * as solicitudeActions from '../../actions/solicitude/solicitude';

jest.mock('../../actions/solicitude/solicitude', () => ({
  handleCreateSolicitude: jest.fn()
}));

describe('SolicitudeForm', () => {
  const dummyData = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'Ana' }
  ];

  test('llama a handleCreateSolicitude con los datos correctos', async () => {
    solicitudeActions.handleCreateSolicitude.mockResolvedValue({ status: 200 });

    render(<SolicitudeForm onCreate={jest.fn()} onClose={jest.fn()} data={dummyData} />);

    fireEvent.change(screen.getByPlaceholderText(/descripción/i), { target: { value: 'desc' } });
    fireEvent.change(screen.getByPlaceholderText(/resumen/i), { target: { value: 'res' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    fireEvent.submit(screen.getByRole('button', { name: /crear solicitud/i }));

    expect(solicitudeActions.handleCreateSolicitude).toHaveBeenCalledWith({
      description: 'desc',
      resume: 'res',
      date: '',
      employeeId: '1'
    });
  });
});
