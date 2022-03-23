import { Children, FC, useEffect, useState, cloneElement, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener'
interface propsModal {
    title: string
    onClose: any
    isOpen: boolean
}
const ModalReview : FC <propsModal>  = ({title, onClose, isOpen, children}) => {
  const [currentChild, setChildren] = useState<any[]>([])
  const refForm : any = useRef()
  
  useEffect(() => {
    setChildren(Children.toArray(children))
  }, [children])
  
  
  return (
      <div
      className="fixed z-40 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

      <ClickAwayListener onClickAway={() => onClose()} >
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full ">
             
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 text-primary font-bold"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2 w-full flex items-center justify-center">
                  {/* @ts-ignore */}
                    {cloneElement(Children?.only(children), {ref : refForm, onClose: onClose} )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={refForm?.current?.handleSubmit}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 sm:ml-3 sm:w-auto sm:text-sm transition"
            >
              Enviar reseña
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Descartar
            </button>
          </div>
        </div>
    </ClickAwayListener>
      </div>
    </div>
  );
};

export default ModalReview;
