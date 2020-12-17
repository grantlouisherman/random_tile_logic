export function getEnrollableBenefits(filterArray, benefits) {
  return filterArray
    .slice()
    .filter(
      (benefit) =>
        !benefits[benefit].enrollmentDetails || // this line is here for when using content data only
        !Object.keys(benefits[benefit].enrollmentDetails).length
    )
    .map((benefit) => ({ benefit, category: "Enrollment" }));
}

export function findBenefitFilterCategory(filterList, benefit) {
  for (let filter in filterList) {
    const currentFilter = filterList[filter];
    if (currentFilter.includes(benefit)) return filter;
  }
}

export function getStaticBenefits(
  benefitsOrderList,
  notEnrolledBenefits,
  filters
) {
  return benefitsOrderList
    .filter((benefit) => !notEnrolledBenefits.includes(benefit))
    .map((benefit) => ({
      benefit,
      category: findBenefitFilterCategory(filters, benefit)
    }));
}

export function swap(target, arr) {
  let tmp = arr[2];
  arr[2] = arr[target];
  arr[target] = tmp;
}

export function determineTiles(array, updateFunction) {
  if (array.length === 0) {
    return [];
  }
  if (array.length === 1) {
    return [array[0]];
  }
  // This is how you have randomized pointers
  let firstTile = Math.floor(Math.random() * array.length);
  let secondTile = Math.floor(Math.random() * (array.length - 1));
  while (firstTile === secondTile) {
    //avoid duplicates
    secondTile = Math.floor(Math.random() * (array.length - 1));
  }
  const first = array[firstTile];
  const second = array[secondTile];
  swap(firstTile, array.length - 1, array);
  swap(secondTile, array.length - 2, array);
  return [first, second];
}

export function randomSort(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}
