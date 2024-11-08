import { createContext, useContext, useEffect, useState } from 'react';


interface CreatorContextType {

}

const CreatorContext = createContext<CreatorContextType>({});

export function CreatorProvider({ children }: { children: React.ReactNode }) {


  return (
    <CreatorContext.Provider 
      value={{

      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreator() {
  return useContext(CreatorContext);
}