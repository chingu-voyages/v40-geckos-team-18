import { Accordion, Button, Label, Select } from 'flowbite-react';
import React, { ReactElement, useState } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { CountryCode } from '../../schema/electricity.schema';
import { NextPageWithLayout } from '../_app';
import StatesData from '../../AppData/states.json';

const UserPreferences: NextPageWithLayout = () => {
  const [country, setCountry] = useState<CountryCode | string>('');
  const [state, setState] = useState('');

  return (
    <div>
      <Accordion flush={true}>
        {/** Location preferences */}
        <Accordion.Panel>
          <Accordion.Title>Location</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-3 md:col-span-2 col-start-1 md:col-start-2">
                <Label
                  htmlFor="countryValue"
                  value="Country"
                  id="countryLabel"
                />
                <Select
                  id="country"
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  value={country}
                  color="dark"
                >
                  <option value="">Select a country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                </Select>
              </div>
              <div className="col-span-3 md:col-span-2">
                <Label htmlFor="stateValue" value="State (optional)" id="stateLabel" />
                <Select
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  color="dark"
                  disabled={country.length === 0 ? true : false}
                >
                  <option value="">Select a state</option>
                  {country === 'us'
                    ? StatesData.states.usStates.map((state) => {
                        return (
                          <option
                            key={state.code + state.id}
                            value={state.code}
                          >
                            {state.name}
                          </option>
                        );
                      })
                    : StatesData.states.caProvinces.map((state) => {
                        return (
                          <option
                            key={state.code + state.id}
                            value={state.code}
                          >
                            {state.name}
                          </option>
                        );
                      })}
                </Select>
              </div>
              <div className="col-span-3 md:col-span-2 col-end-7 md:col-end-6 place-self-end mt-3">
                <Button
                  disabled={country.length === 0 ? true : false}
                >
                  Save
                </Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        {/** Unit preferences */}
        <Accordion.Panel>
          <Accordion.Title>Unit Preferences</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-3 md:col-span-2 col-start-1 md:col-start-2">
                <p>Electrical Wattage Unit:</p>
                <Select>
                  <option value="">Select a unit</option>
                  <option value="kwh">Kilowatt-hours (kWh)</option>
                  <option value="mwh">Megawatt-hours (mWh)</option>
                </Select>
              </div>
              <div className="col-span-3 md:col-span-2">
                <p>Flight and Driving Distance Unit:</p>
                <Select>
                  <option value="">Select a unit</option>
                  <option value="km">Kilometers (km)</option>
                  <option value="mi">Miles (mi)</option>
                </Select>
              </div>
              <div className="col-span-3 md:col-span-2 col-end-7 md:col-end-6 place-self-end mt-3">
                <Button disabled={false}>Save</Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        {/** vehicle preferences */}
        <Accordion.Panel>
          <Accordion.Title>Vehicles</Accordion.Title>
          <Accordion.Content></Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

UserPreferences.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default UserPreferences;
