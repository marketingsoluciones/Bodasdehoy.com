export const format = (date?: Date, locale?: string, options?: object) => {
    return new Intl.DateTimeFormat(locale, options).format(date)
}