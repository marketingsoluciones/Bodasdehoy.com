import { api } from "../api";
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
    console.log(createUser);
    return createUser;
  },

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
          createAt
          updateAt
        }
      }`;
    const {
      data: {
        data: { getUser },
      },
    } = await api.graphql({ query, variables: { uid } });
    return getUser;
  },

  createBusiness: async (variables : any) => {
    const query = `mutation getQuestions ($userUid : ID, $contactName: String, $contactEmail : String, $webPage : String, $landline : String, $mobilePhone : String, $businessName: String, $country : String, $city: String, $zip : String, $address : String, $description : String, $subCategories : [String] ) {
      createBusiness(
        inputBusiness:{
          userUid : $userUid,
          contactName: $contactName,
          contactEmail: $contactEmail,
          webPage: $webPage,
          landline: $landline,
          mobilePhone: $mobilePhone,
          businessName: $businessName,
          country: $country,
          city: $city,
          zip: $zip,
          address: $address,
          description: $description,
          subCategories: $subCategories
        }){
        _id,
        questionsAndAnswers{
            answers
            frequentQuestions
          },
        accessories,
            services,
      }
    }`;
    const data = await api.graphql({ query, variables });
    console.log(data)
    return {};
  },

};
