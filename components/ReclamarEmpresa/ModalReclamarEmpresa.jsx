import ClickAwayListener from "react-click-away-listener"
import Script from "next/script"
import Router from 'next/router'

const ModalReclarEmpresa = ({set, state,}) => {
    return (
        <>


            <div className=" backdrop-filter backdrop-blur z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className=" bg-black opacity-60 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />

            <ClickAwayListener onClickAway={() => state && set(!state) }>
                <div className="bg-white w-max h-4/5 shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10  py-5">
                    <div className="pipedriveWebForms " data-pd-webforms="https://webforms.pipedrive.com/f/clNHJGQZCUUdzuoyeZgofOkJQMFhqWEqwEo77zrn4uamAuTsh0cDvHwXG9G7Yk287N">
                        <Script
                            src="https://webforms.pipedrive.com/f/loader"
                        >
                        </Script>
                    </div>
                   {/*  <div className="px-4 pt-4">
                        {children}
                    </div> */}
                </div>
            </ClickAwayListener>

        </>
    )

}
export default ModalReclarEmpresa