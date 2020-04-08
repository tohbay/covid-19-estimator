import {
  impactCurrentlyInfected,
  severeCurrentlyInfected,
  normalizePeriodInDays,
  infectionsPerPeriod,
  percentageSeverity,
  availableHospitalBedsByRequestTime,
  amountDollarsInFlight
} from './utils';

const covid19ImpactEstimator = (data) => {
  const period = normalizePeriodInDays(data.periodType, data.timeToElapse);

  const infectionsImpactPerPeriod = infectionsPerPeriod(
    impactCurrentlyInfected(data),
    period
  );

  const infectionsSevereImpactPerPeriod = infectionsPerPeriod(
    severeCurrentlyInfected(data),
    period
  );

  // Challenge 1
  const impactedCurrentlyInfected = impactCurrentlyInfected(data);
  const severelyImpactCurrentlyInfected = severeCurrentlyInfected(data);

  // Challenge 2
  const impactSevereCasesByRequetedTime = percentageSeverity(
    infectionsImpactPerPeriod,
    15
  );
  const severeImpactsevereCasesByRequetedTime = percentageSeverity(
    infectionsSevereImpactPerPeriod,
    15
  );

  const impactAvailableHospitalBedsByRequestTime = availableHospitalBedsByRequestTime(
    data.totalHospitalBeds,
    impactSevereCasesByRequetedTime
  );
  const severeImpactAvailableHospitalBedsByRequestTime = availableHospitalBedsByRequestTime(
    data.totalHospitalBeds,
    severeImpactsevereCasesByRequetedTime
  );

  // Challenge 3
  const impactCasesForICU = percentageSeverity(infectionsImpactPerPeriod, 5);

  const severeImpactCasesForICU = percentageSeverity(
    infectionsSevereImpactPerPeriod,
    5
  );

  const impactCasesForVentilators = percentageSeverity(
    infectionsImpactPerPeriod,
    2
  );

  const severeImpactCasesForVentilators = percentageSeverity(
    infectionsSevereImpactPerPeriod,
    2
  );

  const impactDollarsInFlight = amountDollarsInFlight(
    infectionsImpactPerPeriod,
    data,
    period
  );

  const severeImpactDollarsInFlight = amountDollarsInFlight(
    infectionsSevereImpactPerPeriod,
    data,
    period
  );

  const impact = {
    currentlyInfected: Math.trunc(impactedCurrentlyInfected),
    infectionsByRequestedTime: Math.trunc(infectionsImpactPerPeriod),
    severeCasesByRequestedTime: Math.trunc(impactSevereCasesByRequetedTime),
    hospitalBedsByRequestedTime: Math.trunc(
      impactAvailableHospitalBedsByRequestTime
    ),
    casesForICUByRequestedTime: Math.trunc(impactCasesForICU),
    casesForVentilatorsByRequestedTime: Math.trunc(impactCasesForVentilators),
    dollarsInFlight: Math.trunc(impactDollarsInFlight)
  };
  const severeImpact = {
    currentlyInfected: Math.trunc(severelyImpactCurrentlyInfected),
    infectionsByRequestedTime: Math.trunc(infectionsSevereImpactPerPeriod),
    severeCasesByRequestedTime: Math.trunc(
      severeImpactsevereCasesByRequetedTime
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      severeImpactAvailableHospitalBedsByRequestTime
    ),
    casesForICUByRequestedTime: Math.trunc(severeImpactCasesForICU),
    casesForVentilatorsByRequestedTime: Math.trunc(
      severeImpactCasesForVentilators
    ),
    dollarsInFlight: Math.trunc(severeImpactDollarsInFlight)
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
