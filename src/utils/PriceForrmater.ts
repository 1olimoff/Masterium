// PriceFormatter.ts

/**
 * Функция для очистки ввода:
 * - Убирает лишние пробелы.
 * - Разрешает символы цифр и запятую.
 * - Выставляет флаг hasInvalid, если встречаются символы, отличные от цифр и запятой.
 * - Удаляет запятые для получения чистого числа.
 */
export const sanitizePriceInput = (
    price: string
): { sanitized: string; hasInvalid: boolean } => {
    const trimmed = price.trim();
    // Разрешаем только цифры и запятую
    const hasInvalid = /[^0-9,]/.test(trimmed);
    // Удаляем всё, кроме цифр (то есть убираем запятые), чтобы получить число для преобразования
    const sanitized = trimmed.replace(/[^0-9]/g, '');
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
 * - Очищает ввод (с учётом разрешённых символов).
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
