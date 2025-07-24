export class Session {
  constructor(
    public readonly psychologistId: string,
    public readonly date: string,
    public readonly patientTimezone: string,
    public readonly timeSlot: string,
    public readonly mode: string,
    public readonly id?: string,
  ) {}
}
