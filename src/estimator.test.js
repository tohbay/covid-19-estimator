import {
  inputData,
  impactNumber,
  severeImpactNumber,
  daysWeek,
  daysMonth
} from './constants';

import {
  impactCurrentlyInfected,
  severeCurrentlyInfected,
  normalizePeriodInDays,
  infectionsPerPeriod,
  percentageSeverity,
  availableHospitalBedsByRequestTime,
  amountDollarsInFlight
} from './utils';

describe('Get number of currently infected for impact and severe impact cases', () => {
  it('Get number of currently infected impact cases', () => {
    expect(impactCurrentlyInfected(inputData)).toEqual(
      inputData.reportedCases * impactNumber
    );
    expect(impactCurrentlyInfected(inputData)).not.toBeNaN();
  });

  it('Get number of currently infectedsevere impact cases', () => {
    expect(severeCurrentlyInfected(inputData)).toEqual(
      inputData.reportedCases * severeImpactNumber
    );
    expect(severeCurrentlyInfected(inputData)).not.toBeNaN();
  });
});

describe('Normalize duration in days', () => {
  it('should normalize the duration of impact in days', () => {
    expect(normalizePeriodInDays('months', inputData.timeToElapse)).toEqual(
      inputData.timeToElapse * daysMonth
    );
    expect(normalizePeriodInDays('weeks', inputData.timeToElapse)).toEqual(
      inputData.timeToElapse * daysWeek
    );
    expect(normalizePeriodInDays('days', inputData.timeToElapse)).toEqual(
      inputData.timeToElapse
    );
  });
});

describe('Compute Integer value', () => {
  it('should integer value of a float', () => {
    expect(Math.trunc(inputData.timeToElapse)).toBeTruthy();
  });
});

describe('Compute total infections at requested time impact period', () => {
  it('should calculate total infections at requested time impact period', () => {
    expect(
      infectionsPerPeriod(
        impactCurrentlyInfected(inputData),
        inputData.timeToElapse
      )
    ).toEqual(
      inputData.reportedCases
        * impactNumber
        * 2 ** Math.trunc(inputData.timeToElapse / 3)
    );
  });
});

describe('Compute total infections at requested time severe impact period', () => {
  it('should calculate total infections at requested time severe impact period', () => {
    expect(
      infectionsPerPeriod(
        severeCurrentlyInfected(inputData),
        inputData.timeToElapse
      )
    ).toEqual(
      inputData.reportedCases
        * severeImpactNumber
        * 2 ** Math.trunc(inputData.timeToElapse / 3)
    );
  });
});

describe('Compute 15% of estimated number of impact positive cases at requested time', () => {
  it('should calculate 15% estimated number of impact positive cases at requested time', () => {
    const impactSeverity = infectionsPerPeriod(
      impactCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const impactSeverityFromTest = inputData.reportedCases
      * impactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(impactSeverity, 0.15)).toEqual(
      percentageSeverity(impactSeverityFromTest, 0.15)
    );
  });
});

describe('Compute 15% of estimated number of severe impact positive cases at requested time', () => {
  it('should calculate 15% estimated number of severe impact positive cases at requested time', () => {
    const severeImpactSeverity = infectionsPerPeriod(
      severeCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const severeImpactSeverityFromTest = inputData.reportedCases
      * severeImpactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(severeImpactSeverity, 0.15)).toEqual(
      percentageSeverity(severeImpactSeverityFromTest, 0.15)
    );
  });
});

describe('Compute avaiable hospital beds for impact positive cases at requested time', () => {
  it('should calculate available hospital beds for impact positive cases at requested time', () => {
    const impactSeverity = infectionsPerPeriod(
      impactCurrentlyInfected(inputData),
      inputData.timeToElapse
    );

    const impactSeverityFromTest = inputData.reportedCases
      * impactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);

    expect(
      availableHospitalBedsByRequestTime(
        inputData.totalHospitalBeds,
        impactSeverity
      )
    ).toEqual(
      availableHospitalBedsByRequestTime(
        inputData.totalHospitalBeds,
        impactSeverityFromTest
      )
    );
  });
});

describe('Compute avaiable hospital beds for severe impact positive cases at requested time', () => {
  it('should calculate available hospital beds for severe impact positive cases at requested time', () => {
    const severeImpactSeverity = infectionsPerPeriod(
      severeCurrentlyInfected(inputData),
      inputData.timeToElapse
    );

    const severeImpactSeverityFromTest = inputData.reportedCases
      * severeImpactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);

    expect(
      availableHospitalBedsByRequestTime(
        inputData.totalHospitalBeds,
        severeImpactSeverity
      )
    ).toEqual(
      availableHospitalBedsByRequestTime(
        inputData.totalHospitalBeds,
        severeImpactSeverityFromTest
      )
    );
  });
});

describe('Compute 5% impact positive cases at requested time for ICU', () => {
  it('should calculate 5% impact positive cases at requested time for ICU', () => {
    const impactSeverity = infectionsPerPeriod(
      impactCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const impactSeverityFromTest = inputData.reportedCases
      * impactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(impactSeverity, 0.05)).toEqual(
      percentageSeverity(impactSeverityFromTest, 0.05)
    );
  });
});

describe('Compute 5% severe impact positive cases at requested time for ICU', () => {
  it('should calculate 5% severe impact positive cases at requested time for ICU', () => {
    const severeImpactSeverity = infectionsPerPeriod(
      severeCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const severeImpactSeverityFromTest = inputData.reportedCases
      * severeImpactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(severeImpactSeverity, 0.05)).toEqual(
      percentageSeverity(severeImpactSeverityFromTest, 0.05)
    );
  });
});

describe('Compute 2% impact positive cases at requested time for Ventilators', () => {
  it('should calculate 2% impact positive cases at requested time for Ventilators', () => {
    const impactSeverity = infectionsPerPeriod(
      impactCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const impactSeverityFromTest = inputData.reportedCases
      * impactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(impactSeverity, 0.02)).toEqual(
      percentageSeverity(impactSeverityFromTest, 0.02)
    );
  });
});

describe('Compute 2% severe impact positive cases at requested time for Ventilators', () => {
  it('should calculate 2% severe impact positive cases at requested time for Ventilators', () => {
    const severeImpactSeverity = infectionsPerPeriod(
      severeCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const severeImpactSeverityFromTest = inputData.reportedCases
      * severeImpactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);
    expect(percentageSeverity(severeImpactSeverity, 0.02)).toEqual(
      percentageSeverity(severeImpactSeverityFromTest, 0.02)
    );
  });
});

describe('Compute Dollars In Flight for impact positive cases at requested time', () => {
  it('should calculate Dollars In Flight forimpact positive cases at requested time', () => {
    const impactSeverity = infectionsPerPeriod(
      impactCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const impactSeverityFromTest = inputData.reportedCases
      * impactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);

    expect(amountDollarsInFlight(impactSeverity, inputData)).toEqual(
      amountDollarsInFlight(impactSeverityFromTest, inputData)
    );
  });
});

describe('Compute Dollars In Flight for severe impact positive cases at requested time', () => {
  it('should calculate Dollars In Flight forsevere impact positive cases at requested time', () => {
    const severeImpactSeverity = infectionsPerPeriod(
      severeCurrentlyInfected(inputData),
      inputData.timeToElapse
    );
    const severeImpactSeverityFromTest = inputData.reportedCases
      * severeImpactNumber
      * 2 ** Math.trunc(inputData.timeToElapse / 3);

    expect(amountDollarsInFlight(severeImpactSeverity, inputData)).toEqual(
      amountDollarsInFlight(severeImpactSeverityFromTest, inputData)
    );
  });
});
