import {SubName} from "./SubCategory";
import {Image} from "./Media";


export interface Nft{
  id: number,
  price: string,
  createdAt :Date ,
  subCategory: SubName[],
  image :Image,
}




