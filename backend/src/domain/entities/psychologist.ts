export type AvailabilitySlot = {
  day: string;
  hour: string;
  mode: 'online' | 'presencial';
};

export class Psychologist {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly topics: string[],
    public readonly availability: AvailabilitySlot[],
  ) {}
}
