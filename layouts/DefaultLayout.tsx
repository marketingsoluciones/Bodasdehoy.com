import dynamic from 'next/dynamic';
import { FC } from 'react';
import { LoadingProvider } from '../context';
import ButtonCrearEmpresa from '../components/ButtonCrearEmpresa';
const DynamicAuthProvider = dynamic(() : any => import('../context').then(mod => mod.AuthProvider))
const DynamicToastProvider = dynamic(() : any => import('../context').then(mod => mod.ToastProvider))
const DynamicSocketProvider = dynamic(() : any => import('../context').then(mod => mod.SocketProvider))
const DynamicChatsProvider = dynamic(() : any => import('../context').then(mod => mod.ChatProvider))
const DynamicNavigation = dynamic(() : any => import('../components/Surface').then(mod => mod.Navigation))
const DynamicFooter = dynamic(() : any => import('../components/Surface/Footer').then(mod => mod.Footer))
const DynamicFooterMobile = dynamic(() : any => import('../components/Surface/FooterMobile').then(mod => mod.FooterMobile))

const DefaultLayout: FC = ({ children }) => {
  
  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider>
      <DynamicChatsProvider>
      <LoadingProvider>
      <DynamicToastProvider>
        <div className="bg-color-base relative min-h-screen w-full">
          <ButtonCrearEmpresa />
          <DynamicNavigation />
          {/* <NavigationMobile /> */}
          <main className="w-full pt-20">
            {children}
            </main>
          <DynamicFooter />
          <DynamicFooterMobile />
        </div>
      </DynamicToastProvider>
      </LoadingProvider>
      </DynamicChatsProvider>
      </DynamicSocketProvider>
    </DynamicAuthProvider>
  );
};

export default DefaultLayout;
