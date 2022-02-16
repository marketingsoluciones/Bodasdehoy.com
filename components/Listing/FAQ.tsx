import { Accordion } from "../Surface";
import { FAQIcon } from "../Icons"
import { FC, useState } from 'react';
import { questionsAndAnswers } from '../../interfaces/index';

const FAQ : FC <{data: questionsAndAnswers[]}> = ({data}) => {
  const [isActive, setActive] = useState <number | null>(null)
    return (
        <div>
            <div className="flex items-center gap-3 pb-6">
            <FAQIcon/>
            <h2 className="text-gray-500 font-display text-xl">Preguntas frecuentes</h2>
            </div>
            <div className="w-full flex flex-col gap-6">
                  {data && data?.map((item, idx) => {
                    if(item.answers !== ""){
                      return (
                        <Accordion key={idx} title={item.questions.title} isOpen={isActive === idx} onClick={() => idx === isActive ? setActive(null) : setActive(idx)}>
                      {item.answers}
                    </Accordion>
                      )
                    }
                  })}
                </div>
        </div>
    )
}

export default FAQ
