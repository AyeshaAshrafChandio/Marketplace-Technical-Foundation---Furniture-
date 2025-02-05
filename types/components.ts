export interface CardProps {
    id?: string;
    image: string;
    name: string;
    description?: string;
    price?: number;
    color?: string, 
    material?: string,
    dimensions?: {
        length: number,
        width: number,
        height: number,
        weight: number,
        mass_unit: string,
        distance_unit: string
    }, 
    stock?: number , 
    added_on?: string,
    imageUrl?: string,
    rating?: number,
    rating_counts?: number, 
    category?: number,
    comments?: {
        user: string,
        comment: string,
    }
}


export interface FeatureProprs {
    image: string;
    heading: string;
    para: string;
}

export interface CartItem {
    name: string;
    id: string;
    image: string;
    quantity: number;
    price: string | number;
}