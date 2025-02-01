// PriceFormatter.ts

/**
 * Функция для очистки ввода:
 * - Убирает лишние пробелы.
 * - Оставляет только цифры.
 * - Возвращает, были ли обнаружены недопустимые символы.
 */
export const sanitizePriceInput = (price: string): { sanitized: string; hasInvalid: boolean } => {
    const trimmed = price.trim();
    const hasInvalid = /[^\d]/.test(trimmed);
    const sanitized = trimmed.replace(/[^\d]/g, '');
    return { sanitized, hasInvalid };
};

/**
 * Функция для форматирования строки с цифрами,
 * добавляя разделители тысяч (например, "1000" → "1,000").
 */
export const formatPrice = (price: string): string => {
    if (!price) return '';
    const num = Number(price);
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
};

/**
 * Объединённая функция для обработки ввода:
 * - Очищает ввод.
 * - Форматирует число.
 * - Возвращает флаг, если в исходном вводе были недопустимые символы.
 */
export const processPriceInput = (
    price: string
): { formatted: string; hasInvalid: boolean } => {
    const { sanitized, hasInvalid } = sanitizePriceInput(price);
    const formatted = formatPrice(sanitized);
    return { formatted, hasInvalid };
};
