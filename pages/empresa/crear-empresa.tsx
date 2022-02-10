import { Form, Formik, FormikConfig, FormikValues } from "formik";
import {
  Children,
  FC,
  useState,
  cloneElement,
  useReducer,
  Reducer,
} from "react";
import IndiceSteps from "../../components/Business/IndiceSteps";
import { FormYourBusiness, FormQuestion } from "../../components/Forms";
import { ButtonComponent } from "../../components/Inputs";
import { AuthContextProvider } from "../../context";
import { GraphQL } from '../../utils/Fetching';
import FormImages from "../../components/Forms/FormImages";
import PagesWithAuth from "../../HOC/PagesWithAuth";
import { GetServerSidePropsContext, NextPage } from "next";
import { business } from "../../interfaces";
import { useEffect } from 'react';
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
  
  return (
    <section className="w-full relative">
      <img
        alt={"banner"}
        src={"/bannerCreateBusiness.webp"}
        className="w-full h-80 -mt-20 object-center object-cover absolute top-0 left-0 z-0 "
      />
      <div className="max-w-screen-lg mx-auto inset-x-0 z-10 relative py-10">
        <h2 className="text-3xl font-medium font-medium text-tertiary w-full text-center">
          ¡Empecemos el registro!
        </h2>
        <IndiceSteps step={step} />
      </div>

      <div className="max-w-screen-md py-20 mx-auto inset-x-0">
        <FormikStepper
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
}

const FormikStepper = ({
  children,
  step,
  setStep,
  ...props
}: FormikStepper) => {
  const [ChildrenArray, setChildrenArray] = useState<any>(
    Children.toArray(children) ?? []
  );
  const [totalSections, setTotalSections] = useState<number>(ChildrenArray?.length)
  const currentChild = ChildrenArray[step] ?? {};
  const { user } = AuthContextProvider();
  const [data, setData] = useState()

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
          const valuesModified = {...values}

          delete valuesModified.imgLogo
          delete valuesModified.imgMiniatura
          delete valuesModified.imgBanner
          delete valuesModified.coordinates
          delete valuesModified.updatedAt
          delete valuesModified.createdAt
          delete valuesModified.questionsAndAnswers
          delete valuesModified.characteristics
          
          //if (!values._id) {
            const data = await GraphQL.createBusiness({
              ...valuesModified,
              mobilePhone: typeof values.mobilePhone === "number" ? JSON.stringify(values.mobilePhone) : values.mobilePhone,
              landline: typeof values.landline === "number" ? JSON.stringify(values.landline) : values.landline,
            });
           setData(data)
           await actions.setFieldValue("_id", values._id ?? data?._id );
         // }
        };

        try {
          createBusinessAndGetQuestions();
        } catch (error) {
          console.log(error);
        } finally {
          setStep({ type: "NEXT" });
        }

        break;
      //Form Questions | Segundo formulario
      case 1:
        setStep({ type: "NEXT" });
        try {
          await GraphQL.createBusiness({
            ...values,
            mobilePhone: typeof values.mobilePhone === "number" ? JSON.stringify(values.mobilePhone) : values.mobilePhone,
            landline: typeof values.landline === "number" ? JSON.stringify(values.landline) : values.landline,
            fase: "fase2",
          });
        } catch (error) {
          console.log(error);
        }

        break;
      default:
        break;
    }
  };

  const canNext = (step: number) : boolean | undefined => {
    if(step >= 0 && step < totalSections){
      return false
    } else {
      return true
    }

  }
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
        {cloneElement(currentChild, {data})}
        <div className="flex items-center justify-between w-full py-4 px-10">
          
            <ButtonComponent type="button" disabled={canPrevious(step)} onClick={() => {
              setStep({ type: "PREV" })
              console.log("hola")
            }}>
              Atras
            </ButtonComponent>
         
        <ButtonComponent disabled={canNext(step)} variant={"primary"} type={"submit"}>{step + 1 === totalSections ? "Finalizar" : "Siguiente"}</ButtonComponent>
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
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    
    if(context.query.id){
      const result = await GraphQL.getBusinessByID({id : context.query.id})
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
