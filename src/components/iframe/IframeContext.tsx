import React, { createContext, useContext, useState, useEffect } from "react";

interface IframeContextType {
  isIframeVisible: boolean;
  setIframeVisible: (visible: boolean) => void;
}

const IframeContext = createContext<IframeContextType | undefined>(undefined);

export const IframeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isIframeVisible, setIsIframeVisible] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isIframeVisible");
      return savedState === "true";
    }
    return false;
  });

  const setIframeVisible = (visible: boolean) => {
    setIsIframeVisible(visible);
    localStorage.setItem("isIframeVisible", visible.toString());
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const savedState = localStorage.getItem("isIframeVisible");
        setIsIframeVisible(savedState === "true");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <IframeContext.Provider value={{ isIframeVisible, setIframeVisible }}>
      {children}
    </IframeContext.Provider>
  );
};

export const useIframe = () => {
  const context = useContext(IframeContext);
  if (!context) {
    throw new Error("useIframe must be used within an IframeProvider");
  }
  return context;
};
