import React from "react";
import { useGlobalContext } from "./context";
import Photo from "./Photo";

const List = ()=>{
    const {isLoading,photos}=useGlobalContext();
    return(
        <section className="photos">
      <div className="photos-center">
        {photos.map((item) => {
          return (
            <Photo
              id={item.id}
              {...item}
            />
          );
        })}
      </div>
      {isLoading&& <h1>LOADIN ...</h1> }
    </section>
    )
}

export default List;