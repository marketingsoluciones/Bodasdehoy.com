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

  

  getBusinessByID: async (variables: any) => {
    const query = `query ($id: ID) {
      getOneBusiness(_id: $id){
        _id
        slug
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
        subCategories{
          _id
        }
        questionsAndAnswers{
          questions{
            _id
            title
          }
          answers
        }
        coordinates{
          lat
          lng
        }
        categories{
          _id
        }
        subCategories{
          _id
        }
        imgMiniatura{
          _id
          i1024
          i800
          i640
          i320
        }
        imgLogo{
          _id
          i1024
          i800
          i640
          i320
        }
        status
        createdAt
        updatedAt
        characteristics{
          characteristic{
            _id
            title
            items{
              _id
              title
            }
          }
          items{
            _id
            title
          }
          
        }
        imgCarrusel {
          _id
          i1024
          i800
          i640
          i320
        }
      }
    }`;
    const {
      data: {
        data: { getOneBusiness },
      },
    } = await api.graphql({ query, variables });
    return getOneBusiness;
  },

  // getPhotosBusinessByID: async (variables: any) => {
  //   const query = `query getBusiness($_id : ID){
  //     getBussines(id:$_id){
  //         _id,
  //         photos{
  //           _id
  //           mediumUrl
  //         }
  //       }
  //   }
  //   `;
  //   const {
  //     data: {
  //       data: { getBussines },
  //     },
  //   } = await api.graphql({ query, variables });
  //   return getBussines;
  // },

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
    const query = `mutation ($fase: String,
      $_id: ID,
      $userUid : ID,
      $contactName: String,
      $contactEmail : String,
      $mobilePhone : String,
      $businessName: String!,
      $country : String,
      $city: String,
      $webPage : String,
      $landline : String,
      $zip : String,
      $address : String,
      $description : String,
      $subCategories : [inputObjectID]
      $questionsAndAnswers : [inputQuestionsAndAnswers]
      $characteristics: [inputCharacteristicsCms]
      ) {
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
              subCategories: $subCategories,
              questionsAndAnswers : $questionsAndAnswers
              characteristics : $characteristics
              webPage: $webPage
              landline: $landline
            }){
            _id,
            fase,
            questionsAndAnswers{
              questions{
                _id
                title
              }
              answers
            }
            characteristics{
              characteristic{
                _id
                title
                items{
                  _id
                  title
                }
              }
              
            }
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
      getCategoryBusiness{
        total
        results{
          _id
          title
          imgMiniatura{
            i1024
            i800
            i640
            i320
          }
          imgBanner{
            i1024
            i800
            i640
            i320
          }
          slug
          description
          subCategories{
            _id
            title
            imgMiniatura{
            i1024
            i800
            i640
            i320
          }
            slug
            description
          }
        }
      }
    }`;
    const variables = {};
    const {
      data: {
        data: { getCategoryBusiness },
      },
    } = await api.graphql({ query, variables });
    return getCategoryBusiness;
  },

  uploadImage: async (file: any, id: string, use: string) => {
    const newFile = new FormData();
    const params = {
      query: `mutation ($file: Upload!, $businessID : String, $use : String) {
                singleUpload(file: $file, businessID:$businessID, use : $use){
                  _id
                  i1024
                  i800
                  i640
                  i320
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
            i1024
            i800
            i640
            i320
          }
        }
        categoriesBusiness{
            title
          	subCategories{
              _id
              title
              imgMiniatura{
                i1024
                i800
                i640
                i320
              }
            }
            slug
            imgMiniatura{
              i1024
              i800
              i640
              i320
            }
        }
        post{
          _id
          title
          slug
          seoDescription
          content
          createdAt
          imgMiniatura{
            i1024
            i800
            i640
            i320
          }
        }
        categoriesPost{
          title
          imgMiniatura{
              i1024
              i800
              i640
              i320
          }
          subCategories{
            _id
            title
            slug
            imgMiniatura{
              i1024
              i800
              i640
              i320
            }
          }
          slug
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

  getBusinessBySlug: async (slug: string) => {
    const query = `query ($slug: String){
      getOneBusiness(slug: $slug){
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
          categories{
            _id
          }
          subCategories{
            _id
          }
          questionsAndAnswers{
            frequentQuestions{
              _id
              title
            }
            answers
          }
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
          }
          imgLogo{
            _id
            i1024
            i800
            i640
            i320
          }
          fase
          status
          createdAt
          updatedAt
          imgCarrusel {
            _id
            i1024
            i800
            i640
            i320
          }
          characteristics{
            characteristic{
              _id
              title
              items{
                _id
                title
              }
            }
            
          }
    }}`;
    const variables = {
      slug,
    };
    const {
      data: {
        data: { getOneBusiness },
      },
    } = await api.graphql({ query, variables });

    return getOneBusiness;
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

  getTopFivePost: async () => {
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
    }`;

    const {
      data: {
        data: { getAllPost },
      },
    } = await api.graphql({ query, variables: {} });
    return getAllPost;
  },

  getMagazine: async () => {
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
    }`;
    const variables = {};

    const {
      data: {
        data: { getMagazine },
      },
    } = await api.graphql({ query, variables });
    return getMagazine;
  },
  deleteBusiness: async (id : string) => {
    const query = `mutation ($id : [ID]){
      deleteBusinesses(id: $id)
    }`;
    const variables = {id};

    const {
      data: {
        data: { deleteBusinesses },
      },
    } = await api.graphql({ query, variables });
    return deleteBusinesses;
  },

};
