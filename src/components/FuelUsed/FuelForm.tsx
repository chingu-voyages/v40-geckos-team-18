import React from "react";

export default function FuelForm () {
    return (
        <div>
            {/* Replace this placeholder route */}
            <form action="/api/form" method="POST">
                
                {/* Add regex to validate answers once I know what the questions are. */}
                <label htmlFor="api_name">Which fuel do you use?</label>
                <select name="api_name" id="fuel_name">
                    <option value="bit">Gasoline</option>
                    <option value="dfo">Diesel</option>
                    <option value="pc">Petroil</option>
                </select>

                {/* COnditionally render the options according to: https://www.notion.so/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392 */}
                <label htmlFor="unit">Which measuring unit do you use?</label>
                <select name="unit" id="unit">
                    <option value="btu">BTU</option>
                    <option value="gallon">Gallon</option>
                </select>

                <label htmlFor="value">What is the quantity of fuel you consumed? (based on the unit you've chosen above)</label>
                <input type="text" id="quantity" name="quantity" required />

                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    )
}