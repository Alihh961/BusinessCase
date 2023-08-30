interface Media{
  id :number,
  description :string,
  name :string,
  url :string,
}

export interface Image extends Media{

}

export interface Video extends Media{
duration :number,
}

export interface Audio extends Media{
duration :number,
}
