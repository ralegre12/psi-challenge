import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import api from '../../services/api'
import SessionForm from '../SessionForm'

jest.mock('../../services/api')

beforeAll(() => {
  window.alert = jest.fn()
})

const psy = {
  id: '1',
  availability: [{ day: 'Monday', hour: '10:00', mode: 'online' }],
}

describe('<SessionForm />', () => {
  it('deshabilita botón hasta seleccionar slot', () => {
    render(<SessionForm psychologist={psy} onBooked={jest.fn()} />)
    const btn = screen.getByRole('button', { name: /agendar/i })
    expect(btn).toBeDisabled()
  })

  it('envía payload al hacer submit', async () => {
    api.post.mockResolvedValue({ data: { id: 'x' } })
    const onBooked = jest.fn()
    render(<SessionForm psychologist={psy} onBooked={onBooked} />)

    const slotSelect = screen.getByRole('combobox')
    fireEvent.change(slotSelect, { target: { value: 'Monday 10:00' } })

    fireEvent.click(screen.getByRole('button', { name: /agendar/i }))

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith(
        '/sessions',
        expect.objectContaining({
          psychologistId: '1',
          mode: 'online',
          timeSlot: 'Monday 10:00',
        })
      )
    )
    expect(onBooked).toHaveBeenCalledWith('Monday 10:00')
  })
})
