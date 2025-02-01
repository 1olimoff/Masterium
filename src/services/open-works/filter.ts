// services/open-works/filter.ts

// Пример: возвращаем списки каталогов или локаций
export async function getCatalogs(): Promise<string[]> {
    // Тут можно сходить на ваш бекенд, GraphQL, REST API и т.д.
    return ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
}

export async function getLocations(): Promise<string[]> {
    // Тоже заглушка. В реальном проекте – обращение к API / БД
    return ["Butun O'zbekiston", "Tashkent", "Samarkand", "Bukhara"];
}
