/**
Nutritional information of the food.
*/
export type NutritionalInformation = {
  /**
  Kilojoule content of the food per 100g or 100ml (note it's lowercase 'k' and uppercase 'J')
  */
  energykJ: number;

  /**
  Saturated fat in grams per 100g or 100ml
  */
  saturatedFatGrams: number;

  /**
  Sugar content in grams per 100g or 100ml
  */
  totalSugarsGrams: number;

  /**
  Sodium content in mg per 100g or 100ml
  */
  sodiumMilligrams: number;

  /**
  Percentage from 0-100 of fruit, vegetable, nut or legume content. Improves the health star rating. Use with the `attributes` value set.
  */
  percentageFruitVegetableNutLegume?: number;

  /**
  Dietary fibre content in grams per 100g or 100ml. Improves health star rating
  */
  fibreGrams?: number;

  /**
  Protein content in grams per 100g or 100ml. Improves health star rating
  */
  proteinGrams?: number;

  /**
  If the food contains either non-concentrated fruit/vegetable/nuts/legumes sources or concentrated fruits or vegetables. `percentageFruitVegetableNutLegume` must be set if using this
  */
  attributes?: Attributes[];
};

/**
Category of the food. Use the most specific category possible.
*/
export enum Category {
  DairyBeverages = 0,
  /**
   * *"This category does not include ice cream or alternatives derived from cereals, nuts or seeds. These products fall in [OtherFoods]."*
   */
  DairyFoods = 1,
  /**
   * Includes: edible oil, edible oil spreads, margarine, butter
   */
  FatsOilsAndSpreads = 2,
  Cheese = 3,
  PlainWater = 4,
  /**
   * - May only contain -- carbon dioxide, flavouring substances (excluding sugar/sweeteners), mineral salts, safety/stability additives.
   * - Must not include -- added sugars, sweeteners, colours, sodium, caffeine, quinine, or any other ingredient that contains energy.
   */
  UnsweetenedFlavouredWater = 5,
  /**
   * - Includes: *"All whole fresh fruit (except coconut) and vegetables, fungi and legumes (except peanuts) as sold with no processing, plus these same products that have only been peeled, cut and/or surface treated and/or blanched and/or frozen (not dried), or canned without the addition of fat, sugars/sweeteners or salt."*
   * - Excludes: canned fruit and vegetables in juice and brine
   */
  UnprocessedFruitAndVegetables = 6,
  NonDairyBeverages = 7,
  Jellies = 8,
  WaterBasedIcedConfection = 9,
  /**
   * Any food that doesn't fit in the other categories.
   */
  OtherFoods = 100,
}

/**
Attributes of the food, such as whether the food contains non-concentrated fruit/vegetable/nuts/legumes sources or concentrated fruits or vegetables.
*/
export enum Attributes {
  /**
   * Whether the food contains non-concentrated fruit or vegetable sources or concentrated fruits or vegetables.
   */
  ContainsFruitOrVegetable = 0,

  /**
   * Whether the food contains non-concentrated nuts or legumes sources.
   */
  ContainsNutsOrLegumes = 1,
}

/**
Calculates the health star rating of foods based on [Australian Government guidelines](https://web.archive.org/web/20240401093020/http://healthstarrating.gov.au/internet/healthstarrating/publishing.nsf/Content/E380CCCA07E1E42FCA257DA500196044/$File/HSR%20System%20Calculator%20and%20Style%20Guide%20v8.pdf).

@param category - Category of the food.
@param nutritionalInformation - Nutritional information of the food.
@returns One of the following values will be returned: `0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5`


@example
```
import { Attributes, Category, calculateHealthStarRating } from 'health-star-rating';

calculateHealthStarRating(Category.DairyFoods, {
  totalSugarsGrams: 33,
  energykJ: 1100,
  sodiumMilligrams: 100,
  saturatedFatGrams: 0,
});
//=> 1

calculateHealthStarRating(Category.NonDairyBeverages, {
  energykJ: 0,
  saturatedFatGrams: 7,
  sodiumMilligrams: 400,
  totalSugarsGrams: 0,
  attributes: [Attributes.ContainsFruitOrVegetable],
  percentageFruitVegetableNutLegume: 25,
});
//=> 4

calculateHealthStarRating(Category.OtherFoods, {
  saturatedFatGrams: 10.5,
  sodiumMilligrams: 400,
  totalSugarsGrams: 10.5,
  energykJ: 3100,
  fibreGrams: 7,
});
//=> 1.5
```
*/
export function calculateHealthStarRating(category: Category, nutritionalInformation: NutritionalInformation): number;
