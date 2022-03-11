import { Toast as toastType } from '../../context/ToastContext';
import { FC, useState } from 'react';
import {ToastContextProvider} from '../../context/ToastContext'
import { IconError, IconError as IconSuccess, IconError as IconWarning, IconError as IconUpdate } from '../Icons';

const ToastContainer = ({toasts} : {toasts : toastType[]}) => {
    return (
        <div className="fixed top-10  w-full z-50">
            <div className="max-w-xl mx-auto">
            {toasts.map(toast => (
                <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message}  />
            ))}
            </div>
        </div>
    )
}

export default ToastContainer


const Toast : FC <toastType> = ({message, type, id}) => {
    const {dispatch} = ToastContextProvider()
    const [isVisible, setVisible] = useState(false)
    const types = {
        success : {icon : <IconSuccess/>, color: "green"},
        error : {icon: <IconError />, color: "red"},
        warning : {icon: <IconWarning />, color : "yellow"},
        update : {icon: <IconUpdate />, color: "blue"}
    }
    return (
        <div className={`rounded-md bg-${types[type].color}-50 p-4 m-3`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {types[type].icon}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${types[type].color}-800`}>{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => {
                    dispatch({ type: 'DELETE_TOAST', id: id });
                  }}
                  className={`inline-flex bg-${types[type].color}-50 rounded-md p-1.5 text-${types[type].color}-500 hover:bg-${types[type].color}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${types[type].color}-50 focus:ring-${types[type].color}-600`}>
                  <span className="sr-only">Dismiss</span>

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}
