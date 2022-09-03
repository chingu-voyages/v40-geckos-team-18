import React, { useState } from "react";
import {
    Button,
    Select,
    TextInput
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

        
    }

    const unitOptions = fuelData.api_name == "ng" ? ["thousand_cubic_feet", "btu"] : ["gallon", "btu"];
    
    function resetForm() {
        setfuelData(prevFuelData => {
            return {
                api_name: "",
                unit: "",
                quantity: 0
            }
        })
    }

    console.log(fuelData);
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

                <label htmlFor="unit">Which measuring unit do you use?</label>
                <Select
                    id="unit"
                    value={fuelData.unit}
                    onChange={handleChange}
                    name="unit"
                >
                    <option value="">-- Choose</option>
                    <option value={unitOptions[0]}>{unitOptions[0]}</option>
                    <option value={unitOptions[1]}>{unitOptions[1]}</option>
                </Select>

                <br/>

                <label htmlFor="value">What is the quantity of fuel you consumed? (based on the unit you&apos;ve chosen above)</label>
                <TextInput
                id="quantity"
                type="number"
                value={fuelData.quantity}
                onChange={handleChange}
                name="quantity"
              />  

                <div>
                    <Button
                        color="light"
                        onClick={resetForm}
                    >Reset</Button>
                    
                    <Button
                        type="submit"
                        disabled={!fuelData.api_name || !fuelData.unit || fuelData.quantity<1 ? true : false}
                        color="default"
                    >
              Go!
            </Button>

                </div>
          
        </div>
    )
}