import dynamic from 'next/dynamic';
import { FC } from 'react';
const DynamicAuthProvider = dynamic(() : any => import('../context').then(mod => mod.AuthProvider))
const DynamicToastProvider = dynamic(() : any => import('../context').then(mod => mod.ToastProvider))
const DynamicLoadingProvider = dynamic(() : any => import('../context').then(mod => mod.LoadingProvider))
const DynamicNavigation = dynamic(() : any => import('../components/Surface').then(mod => mod.Navigation))
const DynamicFooter = dynamic(() : any => import('../components/Surface/Footer').then(mod => mod.Footer))
const DynamicFooterMobile = dynamic(() : any => import('../components/Surface/FooterMobile').then(mod => mod.FooterMobile))

const DefaultLayout: FC = ({ children }) => {
  
  return (
    <DynamicAuthProvider>
      <DynamicLoadingProvider>
      <DynamicToastProvider>
        <div className="bg-color-base relative min-h-screen w-full">
          <DynamicNavigation />
          {/* <NavigationMobile /> */}
          <main className="w-full pt-20">{children}</main>
          <DynamicFooter />
          <DynamicFooterMobile />
        </div>
      </DynamicToastProvider>
      </DynamicLoadingProvider>
    </DynamicAuthProvider>
  );
};

export default DefaultLayout;
