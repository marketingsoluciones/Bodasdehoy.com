import { Accordion } from "../Surface";
import { FAQIcon } from "../Icons"
import { FC, useState } from 'react';
import { questionsAndAnswers } from '../../interfaces/index';

const FAQ : FC <{data: questionsAndAnswers[]}> = ({data}) => {
  const [isActive, setActive] = useState <number>(0)
    return (
        <div>
            <div className="flex items-center gap-3 pb-6">
            <FAQIcon/>
            <h2 className="text-gray-500 font-display text-xl">Preguntas frecuentes</h2>
            </div>
            <div className="w-full flex flex-col gap-6">
                  {data?.map((item, idx) => {
                    if(item.answers !== ""){
                      return (
                        <Accordion key={idx} title={item.frequentQuestions} isOpen={isActive === idx} onClick={() => setActive(idx)}>
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
