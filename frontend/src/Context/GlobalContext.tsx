import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext<any>(null)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Array<string>>([])

  return (
    <GlobalContext.Provider value={{ filters, setFilters}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)