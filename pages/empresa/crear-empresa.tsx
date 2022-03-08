import { Form, Formik, FormikConfig, FormikValues, useFormikContext } from "formik";
import {
  Children,
  FC,
  useState,
  cloneElement,
  useReducer,
  Reducer,
  useEffect,
  useRef,
  LegacyRef
} from "react";
import IndiceSteps from "../../components/Business/IndiceSteps";
import { FormYourBusiness, FormQuestion } from "../../components/Forms";
import { ButtonComponent } from "../../components/Inputs";
import { AuthContextProvider } from "../../context";
import { fetchApi, GraphQL, queries } from '../../utils/Fetching';
import FormImages from "../../components/Forms/FormImages";
import PagesWithAuth from "../../HOC/PagesWithAuth";
import { GetServerSidePropsContext, NextPage } from "next";
import { business } from "../../interfaces";
import { validations } from "../../components/Business/validations";
import { useRouter } from "next/router";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "NEXT":
      return state + 1;
    case "PREV":
      return state - 1;
    default:
      return;
  }
};

const CreateBusiness : NextPage <{business : Partial<business>}> = (props) => {
  const [step, setStep] = useReducer<Reducer<number, number>>(reducer, 0);
  

  const reduceBusiness = Object?.entries(props.business ?? {}).reduce((acc: any, item: any) => {
    if(item[1]){
      //@ts-ignore
      acc[item[0]] = item[1]
    }
    return acc
  },{})

  const router = useRouter()
  const refHeader = useRef<any>()
  return (
    <section className="w-full relative">
      <img
        alt={"banner"}
        src={"/bannerCreateBusiness.webp"}
        className="md:w-full   md:h-80 -mt-20 md:object-center object-cover absolute top-0 md:left-0 z-0 "
      />
      <div ref={refHeader} tabIndex={0}  className="max-w-screen-lg mx-auto inset-x-0 z-10 relative md:py-10 py-5">
        <h2 className="text-3xl font-medium font-medium text-tertiary w-full text-center mt-6">
          ¡Empecemos el registro!
        </h2>
        <div className="hidden md:block">
          <IndiceSteps step={step} />  
        </div>
      </div>

      <div className="max-w-screen-md md:py-20 mx-auto inset-x-0 px-3 md:px-0 py-18">
        <FormikStepper
        refHeader={refHeader}
          step={step}
          setStep={setStep}
          initialValues={{
            contactName: "",
            contactEmail: "",
            webPage: "",
            mobilePhone: "",
            landline: "",
            businessName: "",
            country: "",
            city: "",
            zip : "",
            address: "",
            description: "",
            coordinates : null,
            imgLogo: null,
            imgMiniatura: null,
            subcategories: [],
            ...reduceBusiness
          }}
          onSubmit={async (values) => {
            await router.push("/empresa")
          }}
        >
          <FormikStep
            label={"Datos Basicos"}
            validationSchema={validations.first}
          >
            <FormYourBusiness />
          </FormikStep>
          <FormikStep label={"Datos Basicos"}>
            {/* @ts-ignore */}
            <FormQuestion />
          </FormikStep>
          <FormikStep label={"Imagenes"}>
            <FormImages />
          </FormikStep>
        </FormikStepper>
      </div>
    </section>
  );
};

export default PagesWithAuth(CreateBusiness);

export const SectionForm: FC = ({ children }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-full flex flex-col justify-center gap-10 h-auto">
      {children}
    </div>
  );
};

interface FormikStepper extends FormikConfig<FormikValues> {
  step: number;
  setStep: any;
  refHeader: any
}

const FormikStepper = ({
  children,
  step,
  setStep,
  refHeader,
  ...props
}: FormikStepper) => {
  const [ChildrenArray, setChildrenArray] = useState<any>(
    Children.toArray(children) ?? []
  );
  const [totalSections, setTotalSections] = useState<number>(ChildrenArray?.length)
  const currentChild = ChildrenArray[step] ?? {};
  const { user } = AuthContextProvider();
  const [data, setData] = useState()
  const [canNext, setCanNext] = useState(true)
  const [canNextForce, setCanNextForce] = useState(false)

  useEffect(() => {
   setTotalSections(ChildrenArray?.length)
  }, [ChildrenArray])
  

  const isLastStep = () => {
    return step === totalSections - 1;
  };

  const handleSubmit = async (values: FormikValues, actions: any) => {
    
    values.userUid = user?.uid;
    

    if (isLastStep()) {
      await props.onSubmit(values, actions);
    }

    switch (step) {
      //Form Business | Primer formulario
      case 0:
        const createBusinessAndGetQuestions = async () => {
          setCanNextForce(true)
          const valuesModified = {...values}

          delete valuesModified.imgBanner
          delete valuesModified.updatedAt
          delete valuesModified.createdAt
          delete valuesModified.questionsAndAnswers
          delete valuesModified.characteristics
          if(valuesModified.coordinates.lat){
            valuesModified.coordinates = {
              type: "Point",
              coordinates: [valuesModified.coordinates.lng, valuesModified.coordinates.lat]
            }
          }
          
          //if (!values._id) {
            const data = await fetchApi({query : queries.createBusiness, variables: {
              ...valuesModified,
              mobilePhone: typeof values.mobilePhone === "number" ? JSON.stringify(values.mobilePhone) : values.mobilePhone,
              landline: typeof values.landline === "number" ? JSON.stringify(values.landline) : values.landline,
            }, type: "formData"});
            if(data){
              await actions.setFieldValue("_id", values._id ?? data?._id );
              await actions.setFieldValue("imgMiniatura", data?.imgMiniatura );
              await actions.setFieldValue("imgLogo", data?.imgLogo );
              setData(data)
              setCanNextForce(false)
            }
            
            
          };
          
          try {
          createBusinessAndGetQuestions();
        } catch (error) {
          console.log(error);
        } finally {
          setStep({ type: "NEXT" });
          setCanNext(true)
        }

        break;
      //Form Questions | Segundo formulario
      case 1:
        
        setStep({ type: "NEXT" });
        try {
          await fetchApi({query : queries.createBusiness, variables: {
            ...values,
            mobilePhone: typeof values.mobilePhone === "number" ? JSON.stringify(values.mobilePhone) : values.mobilePhone,
            landline: typeof values.landline === "number" ? JSON.stringify(values.landline) : values.landline,
            fase: "fase2",
            status: true
          }});
        } catch (error) {
          console.log(error);
        }

        break;
      default:
        break;
    }
    
    refHeader.current.focus()
  };

  useEffect(() => {
    if(!canNextForce){
      if(step >= 0 && step < totalSections){
        setCanNext(false)
      } else {
        setCanNext(true)
      }
    }
  }, [step, totalSections, canNextForce])
  
  const canPrevious = (step: number) : boolean | undefined => {
    
    if(step > 0 && step <= totalSections - 1){
      return false
    } else {
      return true
    }

  }

  return (
    <Formik
      {...props}
      onSubmit={handleSubmit}
      validationSchema={currentChild?.props?.validationSchema}
    >
      <Form autoComplete={"off"}>
        {cloneElement(currentChild, {data, setCanNext})}
        <div className="flex items-center justify-between w-full py-4 px-10">
          
            <ButtonComponent type="button" disabled={canPrevious(step)} onClick={() => {
              setStep({ type: "PREV" })
            }}>
              Atras
            </ButtonComponent>
         
        <ButtonComponent disabled={canNext} variant={"primary"} type={"submit"}>{step + 1 === totalSections ? "Finalizar" : "Siguiente"}</ButtonComponent>
        </div>
      </Form>

    </Formik>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

const FormikStep = ({ children, ...props }: FormikStepProps) => {
  const childrenWithProps = Children.map(children, (child: any) =>
    cloneElement(child, { ...props })
  );


  return <>{childrenWithProps}</>;
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    
    if(context.query.id){
      const result = await fetchApi({query : queries.getOneBusiness, variables: {id : context.query.id}})
      return {
        props: {business : result},
      };
    }
    
    return {
      props: {},
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
