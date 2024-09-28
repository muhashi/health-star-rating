import { expectType } from 'tsd';
import { Attributes, Category, calculateHealthStarRating } from './index.js';

expectType<number>(
  calculateHealthStarRating(Category.OtherFoods, {
    energykJ: 243,
    saturatedFatGrams: 1.2,
    sodiumMilligrams: 56,
    totalSugarsGrams: 6.9,
    proteinGrams: 3.2,
    fibreGrams: 0.6,
  }),
);

expectType<number>(
  calculateHealthStarRating(Category.DairyBeverages, {
    energykJ: 243,
    saturatedFatGrams: 1.2,
    sodiumMilligrams: 56,
    totalSugarsGrams: 6.9,
    proteinGrams: 3.2,
    attributes: [Attributes.ContainsFruitOrVegetable],
    percentageFruitVegetableNutLegume: 25,
  }),
);

expectType<number>(
  calculateHealthStarRating(Category.FatsOilsAndSpreads, {
    energykJ: 243,
    saturatedFatGrams: 1.2,
    sodiumMilligrams: 56,
    totalSugarsGrams: 6.9,
  }),
);

expectType<number>(
  calculateHealthStarRating(Category.NonDairyBeverages, {
    energykJ: 243,
    saturatedFatGrams: 1.2,
    sodiumMilligrams: 56,
    totalSugarsGrams: 6.9,
  }),
);
