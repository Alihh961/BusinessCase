interface Media {
  id: number,
  description: string,
  name: string,
  url: string,
}

export interface Image extends Media {
  id: number,
}

export interface Video extends Media {
  id: number,
  duration: number,
}

export interface Audio extends Media {
  id: number,
  duration: number,
}
