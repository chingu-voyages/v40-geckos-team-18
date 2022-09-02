import React, { useState } from "react";
import {
    Button,
    Label,
    Select,
    TextInput,
    Tooltip,
  } from 'flowbite-react';

export default function FuelForm () {

    /* Initializing state as single source of truth */
    const [fuelData, setfuelData] = useState({
        api_name: "",
        unit: "",
        quantity: 0
                                    })

    /* Function that updates the state */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        /* Destructuring the event.target object */
        const {name, value} = event?.target;

        setfuelData(prevFuelData => {
            return {
                ...prevFuelData,
                [name]: value
            }
        })

        console.log(fuelData);
    }

    

    return (
        <div>
                          
                <label htmlFor="api_name">Which fuel do you use?</label>
                <Select 
                    id="api_name"
                    value={fuelData.api_name}
                    onChange={handleChange}
                    name="api_name"
                >
                    <option value="">--- Choose</option>
                    <option value="ng">Natural Gas</option>
                    <option value="dfo">Home Heating and Diesel Fuel</option>
                    <option value="pg">Propane Gas</option>
                    <option value="ker">Kerosene</option>
                </Select>

                <br/>

                {/* Conditionally render the options according to: https://www.notion.so/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392 */}
                <label htmlFor="unit">Which measuring unit do you use?</label>
                <select name="unit" id="unit">
                    <option value="btu">BTU</option>
                    <option value="gallon">Gallon</option>
                    <option value="gallon">Thousand cubic feet</option>
                </select>

                <br/>

                <label htmlFor="value">What is the quantity of fuel you consumed? (based on the unit you&apos;ve chosen above)</label>
                <input type="number" id="quantity" name="quantity" required />

                <div>button1 button2</div>
          
        </div>
    )
}