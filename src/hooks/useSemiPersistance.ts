import { useState, useEffect, useRef } from "react";

type persistanceprops={
  key: string, initValue: string;
}
const usePersistanceState = ({key, initValue}: persistanceprops )=> {
  const firstRender = useRef(false);
  const [persistanceKey, setPersistance] = useState(
    localStorage.getItem(key) || initValue
  );
  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return ;
    } else {
      
      localStorage.setItem(key, persistanceKey);
    }
  }, [persistanceKey]);

  return [persistanceKey, setPersistance];
};
export default usePersistanceState;
