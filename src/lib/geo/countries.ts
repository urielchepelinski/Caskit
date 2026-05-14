/** Country display names (top whiskey markets + common) */
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  IE: 'Ireland',
  JP: 'Japan',
  DE: 'Germany',
  FR: 'France',
  AU: 'Australia',
  CA: 'Canada',
  IL: 'Israel',
  IN: 'India',
  TW: 'Taiwan',
  NL: 'Netherlands',
  SE: 'Sweden',
  DK: 'Denmark',
  NO: 'Norway',
  CH: 'Switzerland',
  SG: 'Singapore',
  HK: 'Hong Kong',
  KR: 'South Korea',
  ZA: 'South Africa',
  NZ: 'New Zealand',
  IT: 'Italy',
  ES: 'Spain',
  BR: 'Brazil',
  MX: 'Mexico',
  PL: 'Poland',
  AT: 'Austria',
  BE: 'Belgium',
  FI: 'Finland',
  PT: 'Portugal',
}

/** Currency for each country (ISO 4217) */
const COUNTRY_CURRENCY: Record<string, { code: string; symbol: string }> = {
  US: { code: 'USD', symbol: '$' },
  GB: { code: 'GBP', symbol: '£' },
  IE: { code: 'EUR', symbol: '€' },
  JP: { code: 'JPY', symbol: '¥' },
  DE: { code: 'EUR', symbol: '€' },
  FR: { code: 'EUR', symbol: '€' },
  AU: { code: 'AUD', symbol: 'A$' },
  CA: { code: 'CAD', symbol: 'C$' },
  IL: { code: 'ILS', symbol: '₪' },
  IN: { code: 'INR', symbol: '₹' },
  TW: { code: 'TWD', symbol: 'NT$' },
  NL: { code: 'EUR', symbol: '€' },
  SE: { code: 'SEK', symbol: 'kr' },
  DK: { code: 'DKK', symbol: 'kr' },
  NO: { code: 'NOK', symbol: 'kr' },
  CH: { code: 'CHF', symbol: 'CHF' },
  SG: { code: 'SGD', symbol: 'S$' },
  HK: { code: 'HKD', symbol: 'HK$' },
  KR: { code: 'KRW', symbol: '₩' },
  ZA: { code: 'ZAR', symbol: 'R' },
  NZ: { code: 'NZD', symbol: 'NZ$' },
  IT: { code: 'EUR', symbol: '€' },
  ES: { code: 'EUR', symbol: '€' },
  BR: { code: 'BRL', symbol: 'R$' },
  MX: { code: 'MXN', symbol: 'MX$' },
  PL: { code: 'PLN', symbol: 'zł' },
  AT: { code: 'EUR', symbol: '€' },
  BE: { code: 'EUR', symbol: '€' },
  FI: { code: 'EUR', symbol: '€' },
  PT: { code: 'EUR', symbol: '€' },
}

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code
}

export function getCurrencyForCountry(code: string): { code: string; symbol: string } {
  return COUNTRY_CURRENCY[code.toUpperCase()] || { code: 'USD', symbol: '$' }
}

/** Convert country code to flag emoji (works by encoding to regional indicator symbols) */
export function getCountryFlag(code: string): string {
  const upper = code.toUpperCase()
  if (upper.length !== 2) return ''
  const offset = 0x1F1E6 - 65 // 'A' = 65
  return String.fromCodePoint(upper.charCodeAt(0) + offset, upper.charCodeAt(1) + offset)
}
