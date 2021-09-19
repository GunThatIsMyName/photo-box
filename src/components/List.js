import React from "react";
import { useGlobalContex } from "../context";
import Photo from "../Photo";

const List = () => {
  const { isLoading, list } = useGlobalContex();
  console.log(list,"list")
  return (
    <section className="photos">
      <div className="photos-center">
        {list.map((item) => {
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
  );
};

export default List;
