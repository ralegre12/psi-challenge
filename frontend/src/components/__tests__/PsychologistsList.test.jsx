import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import api from '../../services/api'
import PsychologistsList from '../PsychologistsList'

jest.mock('../../services/api')

const mockData = [
  {
    id: '1',
    name: 'Ana López',
    topics: ['ansiedad'],
    availability: [{ day: 'Monday', hour: '10:00', mode: 'online' }],
  },
  {
    id: '2',
    name: 'Juan García',
    topics: ['depresión'],
    availability: [
      { day: 'Tuesday', hour: '11:00', mode: 'presencial' },
      { day: 'Wednesday', hour: '15:00', mode: 'online' },
      { day: 'Friday', hour: '09:00', mode: 'online' },
    ],
  },
]

beforeEach(() => {
  api.get.mockResolvedValue({ data: mockData })
})

describe('<PsychologistsList />', () => {
  it('muestra la lista y badge de poca disponibilidad', async () => {
    render(<PsychologistsList />)
    expect(screen.getByPlaceholderText(/filtrar por temática/i)).toBeInTheDocument()

    await waitFor(() => expect(api.get).toHaveBeenCalled())
    expect(screen.getByText('Ana López')).toBeInTheDocument()
    expect(screen.getByText('Juan García')).toBeInTheDocument()
    expect(screen.getByText('Poca disponibilidad')).toBeInTheDocument()
  })

  it('llama a `/psychologists?topic=…` al filtrar por tópico', async () => {
    render(<PsychologistsList />)
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))
    api.get.mockClear()

    const input = screen.getByPlaceholderText(/filtrar por temática/i)
    await userEvent.type(input, 'ansiedad')

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith('/psychologists?topic=ansiedad')
    )
  })

  it('llama a `/psychologists?mode=…` al cambiar modalidad', async () => {
    render(<PsychologistsList />)
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))
    api.get.mockClear()

    const modeSelect = screen.getByRole('combobox')
    await userEvent.selectOptions(modeSelect, 'presencial')

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith('/psychologists?mode=presencial')
    )
  })
})
