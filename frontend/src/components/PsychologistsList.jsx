import React, { useEffect, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'
import api from '../services/api'
import './PsychologistsList.css'
import SessionForm from './SessionForm'

export default function PsychologistsList() {
  const [psychologists, setPsychologists] = useState([])
  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  const [bookedSlots, setBookedSlots] = useState({})

  const fetchList = (q, m) => {
    setIsLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('topic', q)
    if (m) params.set('mode', m)
    api
      .get(`/psychologists?${params.toString()}`)
      .then(res => setPsychologists(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  const debouncedFetch = useMemo(
    () => debounce((q, m) => fetchList(q, m), 300),
    []
  )

  useEffect(() => {
    debouncedFetch(topic, mode)
    setSelected(null)
    return () => debouncedFetch.cancel()
  }, [topic, mode, debouncedFetch])

  const filteredPsychologists = psychologists.map(p => ({
    ...p,
    availability: p.availability.filter(
      s => !(
        bookedSlots[p.id] &&
        bookedSlots[p.id].includes(`${s.day} ${s.hour}`)
      )
    ),
  }))

  const visiblePsychologists = filteredPsychologists.filter(
    p => p.availability.length > 0
  )

  const handleBooked = (psyId, slot) => {
    setBookedSlots(prev => ({
      ...prev,
      [psyId]: [...(prev[psyId] || []), slot],
    }))
    setSelected(null)
  }

  return (
    <div className="psychologists-list">
      <h1>Psicólogos Disponibles</h1>
      <div className="filters">
        <input
          className="filter-input"
          placeholder="Filtrar por temática…"
          value={topic}
          onChange={e => setTopic(e.target.value.toLowerCase())}
        />
        <select
          className="filter-select"
          value={mode}
          onChange={e => setMode(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>
      </div>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-item" />
        ))
      ) : (
        <ul className="list">
          {visiblePsychologists.map(p => (
            <li
              key={p.id}
              className="list-item"
              onClick={() => setSelected(p)}
            >
              <div className="psychologist-header">
                <span className="psychologist-name">{p.name}</span>
                {p.availability.length <= 2 && (
                  <span className="badge">Poca disponibilidad</span>
                )}
              </div>
              <div className="psychologist-topics">
                {p.topics.join(', ')}
              </div>

              {selected?.id === p.id && (
                <div className="session-form-container">
                  <ul className="availability-list">
                    {p.availability.map((s, idx) => (
                      <li key={idx}>
                        {s.day} {s.hour} — <em>{s.mode}</em>
                      </li>
                    ))}
                  </ul>
                  <SessionForm
                    psychologist={p}
                    onBooked={slot => handleBooked(p.id, slot)}
                  />
                </div>
              )}
            </li>
          ))}

          {visiblePsychologists.length === 0 && (
            <li className="no-results">No hay psicólogos disponibles.</li>
          )}
        </ul>
      )}
    </div>
  )
}
