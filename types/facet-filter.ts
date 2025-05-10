interface CardDataCategory {
    id: string;
    name: string;
}

interface CardDataBrand {
    id: string;
    name: string;
    icon?: string;
}

export interface CardData {
    id: number;
    name: string;
    description: string;
    price: number | null;
    sharePrice: number | null;
    image: string;
    categories: CardDataCategory[];
    isShare: boolean;
    brand: CardDataBrand;
    rating: number;
}

export const DEFAULT_CARD_DATA = {
    id: 0,
    name: '',
    description: '',
    price: null,
    sharePrice: null,
    image: '',
    categories: [],
    isShare: false,
    brand: {
        id: '',
        name: '',
    },
    rating: 4.4,
};

export interface CardDataParams {
    minPrice?: number;
    maxPrice?: number;
    categories?: CardDataCategory[];
    isShare?: boolean;
    isHighRating?: boolean;
}

export interface FilterValues {
    minPrice?: number | null;
    maxPrice?: number | null;
    categories?: string[];
    isShare?: boolean;
    isHighRating?: boolean;
}
