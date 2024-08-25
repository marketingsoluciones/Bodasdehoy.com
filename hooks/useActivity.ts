import { AuthContextProvider } from "../context";
import { fetchApiEventos, queries } from "../utils/Fetching";


export const useActivity = () => {
  const { link_id, storage_id, user, preregister, SetPreregister, startLink } = AuthContextProvider()

  enum activities {
    used,
    accessed,
    preregistered,
    registered,
    logged,
    logoutd,

    timeStep1Step2,
    selectRole,
    clikNextStep2,
    focusFullNameStep2,
    fullNameStep2,
    focusEmailStep2,
    emailStep2,
    focusPhoneNumberStep2,
    phoneNumberStep2,
    backStep1,
    clikNextStep3,

    focusFullNameStep3,
    fullNameStep3,
    focusEmailStep3,
    emailStep3,
    focusPhoneNumberStep3,
    phoneNumberStep3,

    //writePassword,
    clickFacebook,
    clickGoogle,
    clickRegister,

  }

  const updateActivity = async (activity: keyof typeof activities, payload?: any) => {
    try {
      await fetchApiEventos({
        query: queries.updateActivity,
        variables: { args: { activity } }
      })
    } catch (error) {
      console.log(error)
    }
  };

  const updateActivityLink = async (activity: keyof typeof activities, payload?: any) => {
    try {
      if (link_id) {
        console.log(99900001, "aqui")
        fetchApiEventos({
          query: queries.updateActivityLink,
          variables: {
            args: {
              link_id,
              [preregister ? "_id" : "storage_id"]: preregister ? preregister?._id : storage_id,
              activity,
              timeStep1Step2: activity === "timeStep1Step2" ? !startLink.time ? null : Math.trunc((new Date().getTime() - startLink.time) / 1000) : null,
              idx: activity === "timeStep1Step2" ? startLink.idx : null,
              payload
            }
          }
        }).then((result: any) => {
          if (activity === "registered") {
            SetPreregister(null)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  };
  return [updateActivity, updateActivityLink]
};
