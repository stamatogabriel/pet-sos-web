import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { updateMenu } from "../store/modules/menu/actions";

function Index() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(updateMenu(false));
  }, []);

  return (
    <div>
      Sobre nós
    </div>
  );
}

export default Index;
