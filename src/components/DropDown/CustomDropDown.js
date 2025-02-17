import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Form } from 'react-bootstrap';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';

const DropDown = ({ id, getAPIData, strAPIName, className, defaultOption }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(getAPIData, defaultOption)
    if (getAPIData) {
      const token = localStorage.getItem("loggedinUser");
      axios.get(API_BASE_URL + '/api/' + strAPIName, {
        headers: {
          Authorization: `Bearer ${token}`
        },

      }).then((response) => {
        if (response.data) {
          let responseData = response.data;

          // Add default option at the beginning of the list
          responseData.unshift({ "id": -1, "name": defaultOption });

          // Update state with the fetched data
          setData(responseData);
        }
      })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    } else {
      setData([{ id: -1, name: defaultOption }]);
    }
  }, [getAPIData, strAPIName]);


  return (
    <Form.Select aria-label="dropdown" id={id} className={`${className}`}>
      {CreateDropdownOptions(data)}
    </Form.Select>
  );
  function CreateDropdownOptions(data) {
    return data.map((obj) => (
      <option key={obj.id} value={obj.name}>
        {obj.name}
      </option>
    ));

  }
}

export default DropDown;