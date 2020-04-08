import {
  impactNumber,
  severeImpactNumber,
  daysWeek,
  daysMonth
} from './constants';

export const impactCurrentlyInfected = (data) => data.reportedCases * impactNumber;

export const severeCurrentlyInfected = (data) => data.reportedCases * severeImpactNumber;

export const normalizePeriodInDays = (periodType, days) => {
  switch (periodType) {
    case 'months':
      return days * daysMonth;
    case 'weeks':
      return days * daysWeek;
    default:
      return days;
  }
};

export const infectionsPerPeriod = (currentlyInfected, period) => {
  const factor = Math.trunc(period / 3);
  return currentlyInfected * 2 ** factor;
};

export const percentageSeverity = (totalCases, percentage) => {
  const percentQuest = percentage / 100;
  return totalCases * percentQuest;
};

export const availableHospitalBedsByRequestTime = (data, positiveCases) => {
  const availableHospitalBeds = data * 0.35;
  return availableHospitalBeds - positiveCases;
};

export const amountDollarsInFlight = (count, data, period) => (count
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD)
  / period;
