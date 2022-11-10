import ClickAwayListener from "react-click-away-listener"
import { useEffect, useState } from "react"
import { LoadingItem } from "../Loading";
import Script from "next/script";

const ModalReclarEmpresa = ({ set, state, }) => {
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        const script = document.createElement('script');
        script.src = "https://webforms.pipedrive.com/f/loader";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [state]);

    return (
        <>


            <div className=" backdrop-filter backdrop-blur z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />
            <div className=" bg-black opacity-60 z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden " />

            <ClickAwayListener onClickAway={() => state && set(!state)}>
                <div className="bg-white w-max h-fit shadow-lg fixed m-auto inset-0 z-50 rounded-xl px-10  py-5">
                    <div className="pipedriveWebForms " data-pd-webforms="https://webforms.pipedrive.com/f/clNHJGQZCUUdzuoyeZgofOkJQMFhqWEqwEo77zrn4uamAuTsh0cDvHwXG9G7Yk287N">
                    </div>
                    {/* <Script>
                        (function(w,d,u){
                                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                            })(window,document,'https://cdn.bitrix24.es/b23442305/crm/site_button/loader_2_izw8u8.js');
                    </Script> */}
                </div>
            </ClickAwayListener>

        </>
    )

}
export default ModalReclarEmpresa