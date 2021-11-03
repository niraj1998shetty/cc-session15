
import React, { memo } from 'react'
import InputWithLabel from "./InputWithLabel";
import style from  "./SearchForm.module.css"

type SearchFormProps = {
  onSearchSubmit:  (event:React.FormEvent<HTMLFormElement>)=>void;
    onSearchInput: (event:React.ChangeEvent<HTMLInputElement>)=>void;
    search: string;
    Children:any;
};

const SearchForm=memo(({onSearchSubmit,onSearchInput,search}:SearchFormProps)=>{
  //console.log("yaanform")
return(<>
        <form onSubmit={onSearchSubmit}>
        <InputWithLabel
          id="search"
          value={search}
          onInputChange={onSearchInput}
          type="text"
        >
       
        </InputWithLabel>
        <button className={style.button} disabled={!search} type="submit">
          submit
        </button>
      </form>
      </>
)
   } )

export default SearchForm;
