import React, { useEffect } from "react";
import BannerHero from "../components/BannerHero";

import { useDispatch } from "react-redux";
import { updateMenu } from "../store/modules/menu/actions";

function Index() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(updateMenu(false));
  }, []);

  return (
    <div>
      <BannerHero />
    </div>
  );
}

export default Index;
