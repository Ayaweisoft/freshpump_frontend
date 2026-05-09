import {
  languageLocales,
  type SupportedCurrency,
  type SupportedLanguage,
} from "@/i18n/resources";

const currencyCodePattern = /(NGN|USD|EUR|GBP|GHS|KES|ZAR|AED|CAD|TZS|UGX|XOF)\s?(\d[\d,]*(?:\.\d+)?)([KMB])?/g;
const currencySymbolPattern = /([$€£₦])\s?(\d[\d,]*(?:\.\d+)?)([KMB])?/g;
const percentPattern = /(\d[\d,]*(?:\.\d+)?)%/g;
const unitPattern = /(\d[\d,]*(?:\.\d+)?)(\s?(?:L\/min|L|min|ms|hrs|hr|days|day|d))/g;

const currencySymbols: Record<string, SupportedCurrency> = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "₦": "NGN",
};

const compactPower: Record<string, number> = {
  K: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
};

export function getLocaleForLanguage(language: SupportedLanguage) {
  return languageLocales[language];
}

function parseLocalizedNumber(value: string, suffix?: string) {
  const numericValue = Number(value.replace(/,/g, ""));

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return suffix ? numericValue * compactPower[suffix] : numericValue;
}

export function formatNumberValue(
  value: number,
  language: SupportedLanguage,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(getLocaleForLanguage(language), options).format(value);
}

export function formatCurrencyValue(
  value: number,
  currency: SupportedCurrency,
  language: SupportedLanguage,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(getLocaleForLanguage(language), {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    ...options,
  }).format(value);
}

export function localizeDisplayValue(
  input: string,
  language: SupportedLanguage,
  currency: SupportedCurrency,
) {
  let output = input;

  output = output.replace(currencyCodePattern, (_match, _code, amount, suffix) => {
    const numericValue = parseLocalizedNumber(amount, suffix);

    if (numericValue === null) {
      return _match;
    }

    return formatCurrencyValue(numericValue, currency, language, suffix
      ? { notation: "compact", maximumFractionDigits: 1 }
      : undefined);
  });

  output = output.replace(currencySymbolPattern, (_match, symbol, amount, suffix) => {
    const detectedCurrency = currencySymbols[symbol];
    const numericValue = parseLocalizedNumber(amount, suffix);

    if (!detectedCurrency || numericValue === null) {
      return _match;
    }

    return formatCurrencyValue(numericValue, currency, language, suffix
      ? { notation: "compact", maximumFractionDigits: 1 }
      : undefined);
  });

  output = output.replace(percentPattern, (_match, amount) => {
    const numericValue = parseLocalizedNumber(amount);

    if (numericValue === null) {
      return _match;
    }

    return `${formatNumberValue(numericValue, language, {
      minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 1,
      maximumFractionDigits: 2,
    })}%`;
  });

  output = output.replace(unitPattern, (_match, amount, unit) => {
    const numericValue = parseLocalizedNumber(amount);

    if (numericValue === null) {
      return _match;
    }

    return `${formatNumberValue(numericValue, language, {
      minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 1,
      maximumFractionDigits: 2,
    })}${unit}`;
  });

  return output;
}