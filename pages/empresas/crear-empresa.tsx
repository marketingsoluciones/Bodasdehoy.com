import { Form, Formik, FormikConfig, FormikValues } from "formik";
import {
  Children,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  cloneElement,
} from "react";
import IndiceSteps from "../../components/Business/IndiceSteps";
import { FormYourBusiness, FormQuestion } from "../../components/Forms";
import { ButtonComponent } from "../../components/Inputs";
import { AuthContext } from "../../context/AuthContext";
import { validations } from "./validations";
import { useEffect } from "react";

const createBusiness = () => {
  const [step, setStep] = useState(0);
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
          setStep={(value) => setStep(value)}
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
          <FormikStep label={"Datos 22"}>
            <FormQuestion />
          </FormikStep>
        </FormikStepper>
      </div>
    </section>
  );
};

export default createBusiness;

export const SectionForm: FC = ({ children }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-full flex flex-col justify-center gap-10">
      {children}
    </div>
  );
};

interface FormikStepper extends FormikConfig<FormikValues> {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
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

  const isLastStep = () => {
    return step === ChildrenArray.length - 1;
  };

  const handleSubmit = async (values: any, actions: any) => {
    console.log(step);
    if (isLastStep()) {
      await props.onSubmit(values, actions);
    }

    switch (step) {
      case 0:
        console.log("PASO 0 COMPLETADO");
        setStep(step + 1);
        break;
      case 1:
        console.log("PASO 2");
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
        useEffect(() => {
          setChildrenArray(Children.map(children, (child: any) =>
            cloneElement(child, { values: formik.values })
          ))
        }, [formik.values]);
        return (
          <Form autoComplete={"off"}>
            {currentChild}
            <div className="w-max p-10 mx-auto inset-x-0">
              {step > 0 && (
                <ButtonComponent onClick={() => setStep((s) => s - 1)}>
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
