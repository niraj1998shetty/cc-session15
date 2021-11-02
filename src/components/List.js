import { memo } from "react";

import style from  "./list.module.css"

const List = memo( ({stories,handlerDelete}) => {
  console.log("list is running")

  return <div> 
      <ol>
          
      {/* <Items stories={props.stories} handlerDelete={props.onHandlerDeleteItem}></Items> */}
      {stories.map(function (item,index) {
        return (
          
            <li key={index}>
              <span className={style.item}>
                <a href={item.url}> {item.title}</a>
              </span>
              <span className={style.item}> {item.author}</span>
              <span className={style.item}> {item.num_comments}</span>
              <span className={style.item}> {item.points}</span>

              <span  ><button className={style.button} onClick={()=>handlerDelete(item)}>Delete</button></span>
            </li>
        
        );
      })}
      
      </ol>
  </div>;
})
export default List;
