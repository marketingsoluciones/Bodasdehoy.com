import { api } from "../api";
import { SearchCriteria } from "../interfaces";

export const GraphQL = {
  createUser: async (variables: any) => {
    const query = `mutation crearUsuario ($uid : ID, $city: String, $country : String, $weddingDate : String, $phoneNumber : String, $role : [String]) {
            createUser(uid: $uid, city : $city, country : $country, weddingDate : $weddingDate, phoneNumber : $phoneNumber, role: $role){
                  city
                  country
                  weddingDate
                  phoneNumber
                  role
                }
              }
            `;
    const {
      data: {
        data: { createUser },
      },
    } = await api.graphql({ query, variables });
    return createUser;
  },

  getBusinessByUID: async (variables: any) => {
    const query = `query getBusiness($uid : ID){
      getBusinesses(uid:$uid){
          _id,
          userUid,
          businessName,
          country,
          city,
          zip,
          address,
          coordinates,
          description,
          categories,
          subCategories,
          photos{
            _id
            mediumUrl
          }
        }
    }
    `;
    const {
      data: {
        data: { getBusinesses },
      },
    } = await api.graphql({ query, variables });
    return getBusinesses;
  },

  getBusinessByID: async (variables: any) => {
    const query = `query getBusiness($_id : ID){
      getBussines(id:$_id){
          _id,
          userUid,
          businessName,
          country,
          city,
          zip,
          address,
          coordinates,
          description,
          categories,
          subCategories,
          photos{
            _id
            mediumUrl
          }
        }
    }
    `;
    const {
      data: {
        data: { getBussines },
      },
    } = await api.graphql({ query, variables });
    return getBussines;
  },

  getPhotosBusinessByID: async (variables: any) => {
    const query = `query getBusiness($_id : ID){
      getBussines(id:$_id){
          _id,
          photos{
            _id
            mediumUrl
          }
        }
    }
    `;
    const {
      data: {
        data: { getBussines },
      },
    } = await api.graphql({ query, variables });
    return getBussines;
  },

  //getUser con error en peticion 
  getUser: async (uid: string) => {
    const query = `query getUser ($uid: ID) {
        getUser(uid:$uid){
          phoneNumber
          role
          typeRole
          city
          country
          weddingDate
          signUpProgress
          status
          createdAt
          updatedAt
        }
      }`;
    const {
      data: {
        data: { getUser },
      },
    } = await api.graphql({ query, variables: { uid } });
    return getUser;
  },

  createBusiness: async (variables: any) => {
    const query = `mutation getQuestions ($fase: String, $_id: ID, $userUid : ID, $contactName: String, $contactEmail : String, $mobilePhone : String, $businessName: String, $country : String, $city: String, $zip : String, $address : String, $description : String, $subcategories : [String], $questionsAndAnswers : [inputQuestionsAndAnswers] ) {
      createBusiness(
        fase : $fase,
        id: $_id,
        inputBusiness:{
          userUid : $userUid,
          contactName: $contactName,
          contactEmail: $contactEmail,
          mobilePhone: $mobilePhone,
          businessName: $businessName,
          country: $country,
          city: $city,
          zip: $zip,
          address: $address,
          description: $description,
          subCategories: $subcategories,
          questionsAndAnswers : $questionsAndAnswers
        }){
        _id,
        fase,
        questionsAndAnswers{
            answers
            frequentQuestions
          },
        accessories,
            services,
      }
    }`;
    const {
      data: {
        data: { createBusiness },
      },
    } = await api.graphql({ query, variables });
    return createBusiness;
  },

  getCategories: async () => {
    const query = `query {
      getCategories{
        categorie{
          title
          imgMiniatura
          imgBanner
          slug
          description
        }
        subCategories{
          title
          imgMiniatura
          imgBanner
          slug
          description
        }
      }
    }`;
    const variables = {};
    const {
      data: {
        data: { getCategories },
      },
    } = await api.graphql({ query, variables });
    return getCategories;
  },

  uploadImage: async (file: any, id: string, use: string) => {
    const newFile = new FormData();
    const params = {
      query: `mutation ($file: Upload!, $businessID : String, $use : String) {
                singleUpload(file: $file, businessID:$businessID, use : $use){
                  _id
                  thumbnailUrl
                  smallUrl
                  mediumUrl
                  largeUrl
                  createdAt
                }
              }
            `,
      variables: {
        file: null,
        businessID: id,
        use: use,
      },
    };

    let map = {
      0: ["variables.file"],
    };

    newFile.append("operations", JSON.stringify(params));
    newFile.append("map", JSON.stringify(map));
    newFile.append("0", file);

    const config = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
    };

    const {
      data: {
        data: { singleUpload },
      },
    } = await api.graphql(newFile, config);
    return singleUpload;
  },

  deleteImage: async ({
    idImage,
    idBusiness,
    use,
  }: {
    idImage: string;
    idBusiness: string;
    use: string;
  }) => {
    const query = `mutation deleteUpload ($_id :ID, $businessID:ID, $use : String) {
      deleteUpload(_id:$_id, businessID:$businessID, use:$use)
    }`;
    const variables = { _id: idImage, businessID: idBusiness, use: use };
    const {
      data: {
        data: { deleteUpload },
      },
    } = await api.graphql({ query, variables });
    return deleteUpload;
  },

  getHome: async () => {
    const query = `query {
      getHome{
        business{
          _id
          slug
          description
          businessName
          imgMiniatura{
            _id
            thumbnailUrl
            smallUrl
            mediumUrl
          }
        }
        categoriesBusiness{
          categorie{
            title
            imgMiniatura
            slug
          }
          subCategories{
            title
            imgMiniatura
            slug
          }
        }
        post{
          _id
          title
          slug
          seoDescription
          content
          categories
          createdAt
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
          }
        }
        categoriesPost{
          categorie{
            title
            imgMiniatura
            slug
          }
          subCategories {
            title
            imgMiniatura
            slug
          }
        }
      }
    }`;
    const {
      data: {
        data: { getHome },
      },
    } = await api.graphql({ query, variables: {} });
    return getHome;
  },

  getSlugBusiness: async () => {
    const query = `query{
      getSlugBusiness
    }`;
    const variables = {};

    const {
      data: {
        data: { getSlugBusiness },
      },
    } = await api.graphql({ query, variables });
    return getSlugBusiness;
  },

  getBusinessBySlug: async (slug : string) => {
    const query = `query ($slug: String){
      getBussines(slug: $slug){
        _id
          slug
          userUid
          tags
          contactName
          contactEmail
          businessName
          webPage
          landline
          mobilePhone
          whatsapp
          twitter
          facebook
          linkedin
          youtube
          instagram
          country
          city
          zip
          address
          description
          content
          coordinates
          categories
          subCategories
          questionsAndAnswers{
            frequentQuestions
            answers
          }
          accessories
          services
          servicesList{
            title
            check
          }
          accessoriesList{
            title
            check
          }
          imgMiniatura{
            _id
            thumbnailUrl
            smallUrl
            mediumUrl
          }
          imgLogo{
            _id
            thumbnailUrl
            smallUrl
            mediumUrl
          }
          fase
          status
          createdAt
          updatedAt
    }}`;
    const variables = {
      slug
    };
    const {
      data: {
        data: { getBussines },
      },
    } = await api.graphql({ query, variables });

    return getBussines;
  },

  getSlugPosts: async () => {
    const query = `query {
      getSlugPosts
    }`;
    const variables = {};
    const {
      data: {
        data: { getSlugPosts },
      },
    } = await api.graphql({ query, variables });

    return getSlugPosts;
  },

  getPostByCriteria: async (criteria: Partial<SearchCriteria>) => {
    const query = `query ($criteria : searchCriteriaPost) {
      getAllPost(searchCriteria:$criteria){
        total
        results{
          _id
          title
          subTitle
          content
          permaLink
          slug
          seoDescription
          categories
          groupSubCategories
          subCategories
          tags
          imgCarrusel{
            _id
            mediumUrl
          }
          imgMiniatura{
            _id
            mediumUrl
          }
          authorUsername
          status
          createdAt
          updatedAt
        }
      }
    }`;
    const variables = {
      criteria,
    };
    const {
      data: {
        data: { getAllPost },
      },
    } = await api.graphql({ query, variables });

    return getAllPost;
  },

  getTopFivePost : async () => {
    const query = `
    query  {
      getAllPost(sort: {createdAt : 1} limit: 5){
        total
        results{
          _id
          title
          subTitle
          content
          permaLink
          slug
          seoDescription
          categories
          groupSubCategories
          subCategories
          tags
          imgCarrusel{
            _id
            mediumUrl
          }
          imgMiniatura{
            _id
            mediumUrl
          }
          authorUsername
          status
          createdAt
          updatedAt
        }
      }
    }`

    const {data: {data : {getAllPost}}} = await api.graphql({query, variables: {}})
    return getAllPost
  },

  getMagazine : async () => {
    const query = `query {
      getMagazine{
        lastestPosts{
          _id
          content
          title
          slug
          categories
          updatedAt
          imgMiniatura{
            _id
            mediumUrl
          }
        }
        postsByCategory{
          _id
          title
          seoDescription
          slug
          imgMiniatura{
            _id
            mediumUrl
          }
        }
        postsMoreViews{
          _id
          title
          slug
          imgMiniatura{
            _id
            mediumUrl
          }
        }
        categoriesPost{
          categorie{
            title
            slug
          }
        }
      }
    }`
    const variables = {}

    const {data:{data:{getMagazine}}} = await api.graphql({query, variables})
    return getMagazine
  }
};
