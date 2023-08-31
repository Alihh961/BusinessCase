import {SubCategory} from "./SubCategory";
import {Audio, Image, Video} from "./Media";


export interface Nft{
  id: number,
  price: string,
  createdAt :Date ,
  subCategory: SubCategory,
  image :Image,
  audio :Audio,
  video :Video,
}




