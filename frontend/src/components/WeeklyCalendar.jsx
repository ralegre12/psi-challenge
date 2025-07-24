import React from 'react';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function WeeklyCalendar({ availability }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Hora / Día</th>
          {days.map(d => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(11)].map((_, h) => {
          const hour = `${8 + h}:00`;
          return (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map(d => (
                <td key={d}>
                  {availability.some(s => s.day === d && s.hour === hour)
                    ? '●'
                    : ''}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
