import { Form, Formik, FormikConfig, FormikValues } from "formik";
import {
  Children,
  FC,
  useState,
  useContext,
  cloneElement,
  useReducer,
  Reducer,
} from "react";
import IndiceSteps from "../../components/Business/IndiceSteps";
import { FormYourBusiness, FormQuestion } from "../../components/Forms";
import { ButtonComponent } from "../../components/Inputs";
import { AuthContext } from "../../context/AuthContext";
import { validations } from "./validations";
import { useEffect } from "react";
import { GraphQL } from "../../utils/Fetching";
import FormImages from "../../components/Forms/FormImages";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "NEXT":
      return state + 1;
      break;
    case "PREV":
      return state - 1;
      break;
    default:
      return;
  }
};

const createBusiness = () => {
  const [step, setStep] = useReducer<Reducer<number, number>>(reducer, 2);
  const { user } = useContext(AuthContext);
  return (
    <section className="w-full relative">
      <img
        src={"/bannerCreateBusiness.webp"}
        className="w-full h-80 -mt-20 object-center object-cover absolute top-0 left-0 z-0 "
      />
      <div className="max-w-screen-lg mx-auto inset-x-0 z-10 relative py-10">
        <h2 className="text-3xl font-medium font-medium text-tertiary w-full text-center">
          ¡Empecemos el registro!
        </h2>
        <IndiceSteps step={step + 1} />
      </div>

      <div className="max-w-screen-md py-20 mx-auto inset-x-0">
        <FormikStepper
          step={step}
          setStep={setStep}
          initialValues={{
            userUid: user?.uid ?? "",
            contactName: user?.displayName ?? "",
            contactEmail: user?.email ?? "",
            mobilePhone: user?.phoneNumber ?? "",
            businessName: "",
            country: "",
            city: "",
            zip: "",
            address: "",
            description: "",
            subcategories: [],
            questionsAndAnswers: [],
          }}
          onSubmit={async (values) => {
            console.log("values", values);
          }}
        >
          <FormikStep
            label={"Datos Basicos"}
            validationSchema={validations.first}
          >
            <FormYourBusiness />
          </FormikStep>
          <FormikStep label={"Datos Basicos"}>
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

export default createBusiness;

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
    Children.toArray(children)
  );
  const currentChild = ChildrenArray[step];
  const { user } = useContext(AuthContext);

  const isLastStep = () => {
    return step === ChildrenArray.length - 1;
  };

  const handleSubmit = async (values: any, actions: any) => {
    values.userUid = user?.uid;

    if (isLastStep()) {
      await props.onSubmit(values, actions);
    }

    switch (step) {
      case 0:
        setStep({ type: "NEXT" });
        break;
      case 1:
        setStep({type: "NEXT"})
        const res = await GraphQL.createBusiness({
          ...values,
          mobilePhone: JSON.stringify(values.mobilePhone),
        });
        console.log(res);
        break;
      default:
        break;
    }
  };

  return (
    <Formik
      {...props}
      onSubmit={handleSubmit}
      validationSchema={currentChild?.props?.validationSchema}
    >
      {(formik) => {
        console.log(formik);
        useEffect(() => {
          setChildrenArray(
            Children.map(children, (child: any) =>
              cloneElement(child, {
                values: formik.values,
                setValues: formik.setValues,
              })
            )
          );
        }, [formik.values]);
        return (
          <Form autoComplete={"off"}>
            {currentChild}
            <div className="w-max p-10 mx-auto inset-x-0">
              {step > 0 && (
                <ButtonComponent onClick={() => setStep({ type: "PREV" })}>
                  Atras
                </ButtonComponent>
              )}
            </div>
            <ButtonComponent type={"submit"}>Siguiente</ButtonComponent>
          </Form>
        );
      }}
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
