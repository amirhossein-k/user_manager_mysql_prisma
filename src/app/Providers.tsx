// app/providers.tsx
'use client';

import {
  //  useContext, useEffect,
  
  useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { MainContext } from '@/context/MainContext';
// import CartDrawer from '@/components/cart/CartDrawer';
// import { UserProvider } from '@/context/UserContext2';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
      // const {loading} = useContext(MainContext)

 


  
  return (
    <QueryClientProvider client={queryClient}>
           {/* <UserProvider>  */}
          
           
       {children}

      {/* </UserProvider> */}


    </QueryClientProvider>
  );
}