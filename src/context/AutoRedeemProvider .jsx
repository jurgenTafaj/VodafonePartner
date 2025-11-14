import React, { createContext, useState, useContext } from 'react';

const AutoRedeemContext = createContext();

export const AutoRedeemProvider = ({ children }) => {
  const [isAutoRedeem, setIsAutoRedeem] = useState(false);
  return (
    <AutoRedeemContext.Provider value={{ isAutoRedeem, setIsAutoRedeem }}>
      {children}
    </AutoRedeemContext.Provider>
  );
};

export const useAutoRedeem = () => useContext(AutoRedeemContext);