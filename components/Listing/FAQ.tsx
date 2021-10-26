import { Accordion } from "../Surface";
import { FAQIcon } from "../Icons"

const FAQ = () => {
    const FAQArray = [
        {
          title:
            "¿Cuáles son las características más relevantes de las instalaciones?",
          content: "NUEVA AMERICA",
        },
        { title: "¿Dispones de catering/cocina propia?", content: "" },
        { title: "¿Dispones de menús especiales?", content: "" },
        {
          title: "¿Pueden los novios llevar las bebidas y la tarta de bodas?",
          content: "",
        },
        {
          title: "¿Banquete de la boda al aire libre en jardín o terraza?",
          content: "",
        },
        {
          title:
            "¿Disponéis de un espacio dedicado a realizar la ceremonia de boda?",
          content: "",
        },
        { title: "¿Cómo se efectúa el pago?", content: "" },
      ];
    return (
        <div>
            <div className="flex items-center gap-3 pb-6">
            <FAQIcon/>
            <h2 className="text-gray-200 font-display text-xl">Preguntas frecuentes</h2>
            </div>
            <div className="w-full flex flex-col gap-6">
                  {FAQArray.map((item, idx) => (
                    <Accordion key={idx} title={item.title}>
                      Hola mundo
                    </Accordion>
                  ))}
                </div>
        </div>
    )
}

export default FAQ
