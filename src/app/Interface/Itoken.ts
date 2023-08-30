import {SubCategory} from "./SubCategory";
import {Audio, Image, Video} from "./Media";


export interface Nfts{

  id: number,
  price: string,
  createdAt :Date ,
  subCategory: SubCategory,
  image :Image,
  audio :Audio,
  video :Video,
}




