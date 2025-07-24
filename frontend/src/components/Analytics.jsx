import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Analytics() {
  const [metrics, setMetrics] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get('/analytics');
      setMetrics(data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar métricas');
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (metrics === null) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Métricas de Sesiones</h2>
        <button onClick={load}>Actualizar métricas</button>
        <p>Cargando métricas…</p>
      </div>
    );
  }

  if (!metrics.topTopic) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Métricas de Sesiones</h2>
        <button onClick={load}>Actualizar métricas</button>
        <p>No hay sesiones agendadas aún.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Métricas de Sesiones</h2>
      <button onClick={load}>Actualizar métricas</button>
      <ul style={{ marginTop: 12 }}>
        <li>
          <strong>Top Tema:</strong> {metrics.topTopic.topic} (
          {metrics.topTopic.count})
        </li>
        <li>
          <strong>Día con más sesiones:</strong> {metrics.topDay.day} (
          {metrics.topDay.count})
        </li>
        <li>
          <strong>Modalidad más usada:</strong> {metrics.topMode.mode} (
          {metrics.topMode.count})
        </li>
      </ul>
    </div>
  );
}
