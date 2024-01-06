import React,{ useState } from "react";
import ItemList from "./ItemList";

const RetaurantCategory = ({ data, showItem, setShowIndex }) => {
    const[showItemList, setShowItemList] = useState(showItem);
    const handleClick = () => {
        //todo add logic to collapse expanded itemlist
        setShowIndex();
        // setShowItemList(!showItemList);
    };

  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-blue-100 shadow-lg p-4">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span className="text-3xl bold">⌄</span>
        </div>
       { showItem && <ItemList items={data.itemCards}></ItemList>}
        
      </div>
    </div>
  );
};

export default RetaurantCategory;
