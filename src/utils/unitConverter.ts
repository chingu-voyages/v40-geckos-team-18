export const formatWeightToUserUnitPreference = (
  unitPreference: string,
  value: number
): string => {
  switch (unitPreference) {
    case 'metric':
      return `${value / 1000.0} kg`;
    case 'imperial':
        const lbs = (value / 1000.0) * 2.2
      return `${lbs.toFixed(2)} lbs`;
    default:
      return '';
  }
};
