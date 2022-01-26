
//  @@Categories Interfaces de Categorias de empresas / posts
export interface fetchCategory {
  categorie : category
  subCategories: category[]
}

export type category = {
  title: string
  imgMiniatura : image
  imgBanner : image
  slug : string
  description : string
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
  coordinates: string[]
  categories: string[]
  groupSubCategories: string[]
  subCategories: string[]
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
}

type character = {
  title: string
  check: boolean
}

export interface questionsAndAnswers {
  frequentQuestions: string
  answers: string
}

interface image {
  _id: string
  thumbnailUrl: string
  smallUrl: string
  mediumUrl: string
  largeUrl: string
  createdAt: string
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
  categories: string[]
  groupSubCategories: string[]
  subCategories: string[]
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