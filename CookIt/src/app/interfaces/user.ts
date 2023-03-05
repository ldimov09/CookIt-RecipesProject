import { IRecipe } from "./recipe";

export interface IUser{ 
    id: string;
    name: string;
    email: string;
    reports?: number;
    myRecipes: string[];
}