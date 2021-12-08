
export interface DataFetchCategories {
    getCategories?: GetCategory[];
}

export interface GetCategory {
    categorie?:     string;
    subCategories?: string[];
}
