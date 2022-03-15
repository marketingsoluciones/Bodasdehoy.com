import { UserMax } from "../context/AuthContext"
import { User } from "./FirebaseInterface"

//  @@Categories Interfaces de Categorias de empresas / posts
export interface fetchCategory {
  categorie : category
  subCategories: category[]
}

export type subCategory = {
  _id: string
  title: string
  imgMiniatura : image
  imgBanner : image
  slug : string
  description : string
  characteristics?: characteristicSubCategory[]
}

export type category = {
  _id: string
  title: string
  heading: string
  imgMiniatura : image
  imgBanner : image
  icon : image
  slug : string
  description : string
  subCategories : subCategory[]
  
}

// @@Business Interfaces de business / listing / empresas
export interface business {
  _id: string
  userUid: string
  slug: string
  permaLink: string
  tags: string[]
  contactName: string
  contactEmail: string
  businessName: string
  onLine: online
  webPage: string
  landline: string
  mobilePhone: string
  whatsapp: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  country: string
  city: string
  zip: string
  address: string
  description: string
  content: string
  coordinates: coordinates
  categories: string[]
  groupSubCategories: string[]
  subCategories: subCategory[]
  questionsAndAnswers: questionsAndAnswers[]
  accessories: string[]
  accessoriesList : character[]
  services: string[]
  servicesList : character[]
  business_hours: dias
  photos: image[]
  imgMiniatura: image
  imgLogo: image
  fase: string
  status: string
  createdAt: number
  updatedAt: number
  characteristics: characteristic[]
  reviews : review[],
  review : number,
  reviewsT : reviewsT
    
}

export type reviewsT = {
  total: number
  professionalism: number
  recommended: number
  priceQuality: number
  flexibility: number
}

export type review = {
  _id: string
  average: number
  comment: string
  answer: string
  imgCarrusel : image[]
  user : UserMax
  reference: string
  createdAt : number
}

enum TypesCoordinates {
  "Point" 
}
export type coordinates = {
  type : keyof typeof TypesCoordinates,
  coordinates: number[]
}

export type characteristic = {
  characteristic : itemCharacteristic
  items: character[]
}

export interface characteristicSubCategory {
  title: string,
  items: character[]
}

export interface itemCharacteristic {
  _id : string
  title: string
  items: character[]
}

export type character = {
  _id : string
  title: string
  clicked?: boolean
}

export interface questionsAndAnswers {
  questions: question
  answers: string
}

type question =  {
  _id : string
  title: string
}

export interface image {
  _id: string
  i1024: string
  i800: string
  i640: string
  i320: string
}

interface dias {
  lunes: horario
  martes: horario
  miercoles: horario
  jueves: horario
  viernes: horario
  sabado: horario
  domingo: horario
}

interface horario {
  open: string
  close: string
}


// @@Posts Blog Magazine Interfaces
export interface Post {
  _id: string
  title: string
  subTitle: string
  content: string
  permaLink: string
  slug: string
  seoDescription: string
  categories: category []
  subCategories: subCategory[]
  tags: string[]
  imgCarrusel: image[]
  imgMiniatura: image
  imgTexto: image[]
  authorUsername: string
  status: string
  createdAt: number
  updatedAt: number
}

export interface Page {
  _id: string
  title: string
  content: string
  slug: string
  imgTexto: image[]
  authorUsername: string
  status: string
  createdAt: number
  updatedAt: number
}

export interface OnePost {
  _id: string
  title: string
  subTitle: string
  content: string
  permaLink: string
  slug: string
  seoDescription: string
  categories: category []
  subCategories: subCategory[]
  tags: string[]
  imgCarrusel: image[]
  imgMiniatura: image
  imgTexto: image[]
  authorUsername: string
  status: string
  createdAt: number
  updatedAt: number
}



// @@Fetching Interfaces

 export interface SearchCriteria {
  slug: string
  categories: string[]
  groupSubCategories: string[]
  subCategories: string[]
  tags: string[]
  status: string
  createdAt: number
  updatedAt: number
 }

 export type geolocation = {
  lat : number
  lng : number
}


// @CHATS Interfaces de chats
export interface Chat {
  _id : string
  addedes: addedes[]
  messages: messageChat[]
  createdAt: number
  updatedAt: number
  onLine: online
  title: string
  type: string
  photoURL: string
}

interface addedes {
  userUid: string
  type: string
  online: boolean
}

export interface messageChat {
  type: string
  emitUserUid: string
  message: string
  fileUrl: string
  createdAt: number
  received: boolean
  read: boolean
  deletedEmit: boolean
  deletedReceiv: boolean
}

interface online {
  status : boolean
  dateConection: number
}