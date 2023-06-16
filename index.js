export const Category = {
  DairyBeverages: 0,
  DairyFoods: 1,
  FatsOilsAndSpreads: 2,
  Cheese: 3,
  PlainWater: 4,
  UnsweetenedFlavouredWater: 5,
  UnprocessedFruitAndVegetables: 6,
  NonDairyBeverages: 7,
  Jellies: 8,
  WaterBasedIcedConfection: 9,
  OtherFoods: 100,
};

export const Attributes = {
  ContainsFruitOrVegetable: 0,
  ContainsNutsOrLegumes: 1,
};

function Category1(category) {
  return [Category.NonDairyBeverages, Category.Jellies, Category.WaterBasedIcedConfection].includes(category);
}

function Category1D(category) {
  return category === Category.DairyBeverages;
}

function Category2(category) {
  return category === Category.OtherFoods;
}

function Category2D(category) {
  return category === Category.DairyFoods;
}

function Category3(category) {
  return category === Category.FatsOilsAndSpreads;
}

function Category3D(category) {
  return category === Category.Cheese;
}

export function calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume) {
  if (!attributes || !attributes.length || !(attributes.includes(Attributes.ContainsFruitOrVegetable) || attributes.includes(Attributes.ContainsNutsOrLegumes))) {
    return 0;
  }

  let range = [];

  if (Category1D(category) || Category2(category) || Category2D(category) || Category3(category) || Category3D(category)) {
    if (attributes.includes(Attributes.ContainsFruitOrVegetable)) {
      range = [25, 43, 52, 63, 67, 80, 90, 100];
    } else if (attributes.includes(Attributes.ContainsNutsOrLegumes)) {
      range = [40, 60, 67, 75, 80, 90, 95, 100];
    }
  } else if (Category1(category)) {
    range = [25, 33, 41, 49, 57, 65, 73, 81, 89, 96];
  } else {
    return 0;
  }

  const points = range.findIndex(value => percentageFruitVegetableNutLegume < value);

  if (points >= 0) {
    return points;
  } else if (points === -1 && percentageFruitVegetableNutLegume >= range[range.length - 1]) {
    return range.length;
  }

  return 0;
}

export function calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams) {
  let range = [];

  if (Category1(category)) {
    return 0;
  } else if (baselinePoints >= 13 && fruitVegetableNutLegumePoints < 5) {
    return 0;
  } else if (Category1D(category) || Category2(category) || Category2D(category) || Category3(category) || Category3D(category)) {
    range = [1.6, 3.2, 4.8, 6.4, 8, 9.6, 11.6, 13.9, 16.7, 20, 24, 28.9, 34.7, 41.6, 50];
  } else {
    return 0;
  }

  const points = range.findIndex(value => proteinGrams <= value);

  if (points >= 0) {
    return points;
  } else if (points === -1 && proteinGrams >= range[range.length - 1]) {
    return range.length;
  }

  return 0;
}

export function calculateFibrePoints(category, fibreGrams) {
  let range = [];

  if (Category1(category) || Category1D(category)) {
    return 0;
  } else if (Category2(category) || Category2D(category) || Category3(category) || Category3D(category)) {
    range = [0.9, 1.9, 2.8, 3.7, 4.7, 5.4, 6.3, 7.3, 8.4, 9.7, 11.2, 13, 15, 17.3, 20];
  } else {
    return 0;
  }

  const points = range.findIndex(value => fibreGrams <= value);

  if (points >= 0) {
    return points;
  } else if (points === -1 && fibreGrams >= range[range.length - 1]) {
    return range.length;
  }

  return 0;
}

export function calculateBaselinePoints(category, nutritionalInformation) {
  const ranges = {
    energykJ: [],
    saturatedFatGrams: [],
    totalSugarsGrams: [],
    sodiumMilligrams: [],
  };

  const commonEnergyRange = [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350, 3685];
  const commonSodiumRange = [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260, 1350, 1440, 1530, 1620, 1710, 1800, 1890, 1980, 2070, 2160, 2250, 2340, 2430, 2520, 2610, 2700];

  if (Category1D(category) || Category2(category) || Category2D(category)) {
    ranges.energykJ = commonEnergyRange;
    ranges.saturatedFatGrams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11.2, 12.5, 13.9, 15.5, 17.3, 19.3, 21.6, 24.1, 26.9, 30, 33.5, 37.4, 41.7, 46.6, 52, 58, 64.7, 72.3, 80.6, 90];
    ranges.totalSugarsGrams = [5, 8.9, 12.8, 16.8, 20.7, 24.6, 28.5, 32.4, 36.3, 40.3, 44.2, 48.1, 52, 55.9, 59.8, 63.8, 67.7, 71.6, 75.5, 79.4, 83.3, 87.3, 91.2, 95.1, 99];
    ranges.sodiumMilligrams = commonSodiumRange;
  } else if (Category3(category) || Category3D(category)) {
    ranges.energykJ = commonEnergyRange;
    ranges.saturatedFatGrams = [...Array(30).keys()].map(x => x + 1); // [1..30]
    ranges.totalSugarsGrams = [5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45];
    ranges.sodiumMilligrams = commonSodiumRange;
  } else if (Category1(category)) {
    ranges.energykJ = [-1, 31, 61, 91, 121, 151, 181, 211, 241, 271];
    ranges.totalSugarsGrams = [0.1, 1.6, 3.1, 4.6, 6.1, 7.6, 9.1, 10.6, 12.1, 13.6];
  } else {
    return 0;
  }

  let total = 0;

  for (const [key, range] of Object.entries(ranges)) {
    if (!range || !range.length) {
      continue;
    }

    const nutrition = nutritionalInformation[key];
    const points = range.findIndex(value => nutrition <= value);

    if (points >= 0) {
      total += points;
    } else if (points === -1 && nutrition >= range[range.length - 1]) {
      total += range.length;
    }
  }

  return total;
}

export function ratingFromTotalPoints(category, totalPoints) {
  let pointRange = [];
  let ratings = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];
  const roundedPoints = Math.round(totalPoints);

  if (Category1(category)) {
    pointRange = [-Infinity, -Infinity, 0, 1, 3, 5, 7, 9, 11, 12];
  } else if (Category1D(category)) {
    pointRange = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
  } else if (Category2(category)) {
    pointRange = [-11, -7, -2, 2, 6, 11, 15, 20, 24, 25];
  } else if (Category2D(category)) {
    pointRange = [-2, 0, 2, 3, 5, 7, 8, 10, 12, 13];
  } else if (Category3(category)) {
    pointRange = [13, 16, 20, 23, 27, 30, 34, 37, 41, 42];
  } else if (Category3D(category)) {
    pointRange = [24, 26, 28, 30, 31, 33, 35, 37, 39, 40];
  } else {
    return null;
  }

  const ratingIndex = pointRange.findIndex(value => roundedPoints <= value);

  if (ratingIndex >= 0) {
    return ratings[ratingIndex];
  } else if (ratingIndex === -1 && roundedPoints >= pointRange[pointRange.length - 1]) {
    return ratings[ratings.length - 1];
  }

  return null;
}

export function calculateHealthStarRating(category, {
  energykJ = 0,
  saturatedFatGrams = 0,
  totalSugarsGrams = 0,
  sodiumMilligrams = 0,
  percentageFruitVegetableNutLegume = 0,
  fibreGrams = 0,
  proteinGrams = 0,
  attributes = [],
} = {}) {
  if (typeof category !== 'number' || !Object.values(Category).includes(category)) {
    throw new TypeError(`Expected a Category, got ${typeof input}`);
  }

  if (category === Category.PlainWater || category === Category.UnprocessedFruitAndVegetables) {
    return 5;
  }

  if (category === Category.UnsweetenedFlavouredWater) {
    return 4.5;
  }

  const baselinePoints = calculateBaselinePoints(category, {
    energykJ,
    saturatedFatGrams,
    totalSugarsGrams,
    sodiumMilligrams,
  });

  const fibrePoints = calculateFibrePoints(category, fibreGrams);
  const fruitVegetableNutLegumePoints = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  const proteinPoints = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);

  const totalPoints = baselinePoints - fibrePoints - fruitVegetableNutLegumePoints - proteinPoints;
  const healthStarRating = ratingFromTotalPoints(category, totalPoints);

  return healthStarRating;
}
