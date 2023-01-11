export interface IRecipe{
    id?: string;
    owner: string;
    tags: string[];
    imageUrl: string;
    title: string;
    ingredients: string[];
    description: string;
    comments?: string[];
    likes?: string[];
    dislikes?: string[];
}