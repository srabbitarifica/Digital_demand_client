export function getUniqueKeywords(data: any) {
  const uniqueKeywords = Array.from(new Set(data.keywords));
  return uniqueKeywords;
}

export function getUniqueCountry(data: any) {
  const uniqueKeywords = Array.from(new Set(data.country));
  return uniqueKeywords;
}

export function getUniqueCatgeory(data: any) {
  const uniqueKeywords = Array.from(new Set(data.gt_category));
  return uniqueKeywords;
}

export function getFilterSearchData(data: any, input: string) {
  const inputKeyword: string = input.trim();

  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    gt_category: [] as string[],
    id: [] as (null | number)[],
    keywords: [] as string[],
    vl_value: [] as string[],
  };

  for (let i = 0; i < data.keywords.length; i++) {
    if (data.keywords[i].includes(inputKeyword)) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.gt_category.push(data.gt_category[i]);
      filtered.id.push(data.id[i]);
      filtered.keywords.push(data.keywords[i]);
      filtered.vl_value.push(data.vl_value[i]);
    }
  }
  return filtered;
}

export function getFilterKeywords(selectedKeyword: any, data: any) {
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    gt_category: [] as string[],
    id: [] as (null | number)[],
    keywords: [] as string[],
    vl_value: [] as string[],
  };
  for (let i = 0; i < data.keywords.length; i++) {
    if (selectedKeyword?.some((keyword: any) => data.keywords[i] === keyword)) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.gt_category.push(data.gt_category[i]);
      filtered.id.push(data.id[i]);
      filtered.keywords.push(data.keywords[i]);
      filtered.vl_value.push(data.vl_value[i]);
    }
  }
  return filtered;
}

export function getFilterDate(selectedDate: any, data: any) {
  if (!selectedDate) {
    return data;
  }
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    gt_category: [] as string[],
    id: [] as (null | number)[],
    keywords: [] as string[],
    vl_value: [] as string[],
  };
  for (let i = 0; i < data.dates.length; i++) {
    if (selectedDate?.some((dates: any) => data.dates[i].includes(dates))) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.gt_category.push(data.gt_category[i]);
      filtered.id.push(data.id[i]);
      filtered.keywords.push(data.keywords[i]);
      filtered.vl_value.push(data.vl_value[i]);
    }
  }
  return filtered;
}

export function getFilterCountry(selectedCountry: any, data: any) {
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    gt_category: [] as string[],
    id: [] as (null | number)[],
    keywords: [] as string[],
    vl_value: [] as string[],
  };
  for (let i = 0; i < data.country.length; i++) {
    if (
      selectedCountry?.some((keyword: any) => data.country[i].includes(keyword))
    ) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.gt_category.push(data.gt_category[i]);
      filtered.id.push(data.id[i]);
      filtered.keywords.push(data.keywords[i]);
      filtered.vl_value.push(data.vl_value[i]);
    }
  }
  return filtered;
}

export function getFilterCategory(selectedCategory: any, data: any) {
  const filtered = {
    country: [] as string[],
    dates: [] as string[],
    gt_category: [] as string[],
    id: [] as (null | number)[],
    keywords: [] as string[],
    vl_value: [] as string[],
  };
  for (let i = 0; i < data.gt_category.length; i++) {
    if (
      selectedCategory?.some((keyword: any) =>
        data.gt_category[i].includes(keyword)
      )
    ) {
      filtered.country.push(data.country[i]);
      filtered.dates.push(data.dates[i]);
      filtered.gt_category.push(data.gt_category[i]);
      filtered.id.push(data.id[i]);
      filtered.keywords.push(data.keywords[i]);
      filtered.vl_value.push(data.vl_value[i]);
    }
  }
  return filtered;
}
