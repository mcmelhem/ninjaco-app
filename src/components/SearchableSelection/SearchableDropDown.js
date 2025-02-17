import React,{useEffect, useState }from 'react';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Select from 'react-dropdown-select';
import "./searchable.scss";

const SearchableDropDown = ({id, getAPIData, strAPIName ,className, defaultOption }) => {
    const [data, setData] = useState([]);
     const onChangeDropDown = (values)=>{
      }
      const options = [
        {
          value: 1,
          label: 'Leanne Graham'
        },
        {
          value: 2,
          label: 'Ervin Howell'
        }
      ];
      useEffect(() => {
        if(getAPIData == true){
        const token = localStorage.getItem("loggedinUser");
      axios.get( API_BASE_URL + '/api/'+ strAPIName, {
        headers: {
           Authorization: `Bearer ${token}`
          },
  
        }).then((response) => {
              if(response.hasOwnProperty("data")== true){
               var data = response.data;
               setData(data);
              }
            })
            .catch((error) => {
              console.error("Error fetching user", error);
            });
          }
  }, []);
    
  
      return (
        <Select placeholder ={`${defaultOption}`} id={id} multi options={options} className={`${className}`} onChange={(values) => onChangeDropDown(values)}/>
      );
      function CreateDropdownOptions({ state }) {
        return (
          <option key={state.id} value={state.name}>
            {state.name}
          </option>
        );
      }
  }
  
  export default SearchableDropDown;