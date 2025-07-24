import React, { useState } from 'react';
import api from '../services/api';

export default function SessionForm({ psychologist, onBooked }) {
  const [slot, setSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!slot) return alert('Por favor seleccioná un horario.');
    setLoading(true);

    try {
      const chosen = psychologist.availability.find(
        s => `${s.day} ${s.hour}` === slot
      );
      const payload = {
        psychologistId: psychologist.id,
        date: new Date().toISOString(),
        patientTimezone: tz,
        timeSlot: slot,
        mode: chosen.mode,
      };
      const res = await api.post('/sessions', payload);

      const prev = JSON.parse(localStorage.getItem('sessions') || '[]');
      localStorage.setItem('sessions', JSON.stringify([...prev, res.data]));

      alert('✅ Sesión agendada con éxito');
      onBooked(slot);
    } catch (err) {
      console.error(err);
      alert('❌ Error al agendar la sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
      <select
        value={slot}
        onChange={e => setSlot(e.target.value)}
        disabled={loading}
      >
        <option value="">Elegí un horario</option>
        {psychologist.availability.map((s, i) => {
          const [h, m] = s.hour.split(':').map(Number);
          const date = new Date();
          date.setHours(h, m, 0, 0);
          const display = new Intl.DateTimeFormat('es-AR', {
            timeZone: tz,
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);
          return (
            <option key={i} value={`${s.day} ${s.hour}`}>
              {`${s.day} — ${display} (${s.mode})`}
            </option>
          );
        })}
      </select>

      <button
        type="submit"
        disabled={!slot || loading}
        style={{ marginLeft: 8 }}
      >
        {loading ? 'Agendando…' : 'Agendar Sesión'}
      </button>
    </form>
  );
}
