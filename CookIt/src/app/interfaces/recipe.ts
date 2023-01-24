export interface IRecipe {
  _id?: string;
  owner: string;
  tags: string[];
  imageurl: string;
  title: string;
  ingredients: string[];
  description: string;
  comments?: string[];
  likes?: string[];
  dislikes?: string[];
  servings: any;
  cookTime: any;
}
