import { Accordion, Button, Label, Select } from 'flowbite-react';
import React, { ReactElement, useEffect, useState } from 'react';
import AccountLayout from '../../../layouts/AccountLayout';
import { CountryCode } from '../../../schema/electricity.schema';
import { NextPageWithLayout } from '../../_app';
import StatesData from '../../../AppData/states.json';
import Head from 'next/head';
import { trpc } from '../../../utils/trpc';
import { UserUnitPreference } from '../../../schema/preferences.schema';
import { useSession } from 'next-auth/react';
import VehicleTile from '../../../components/Account/Preferences/VehicleTile';
import NewVehicleModal from '../../../components/Account/Preferences/NewVehicleModal';
import { useRouter } from 'next/router';

const UserPreferences: NextPageWithLayout = () => {
  const router = useRouter()

  const { data: userPreferences } = trpc.useQuery([
    'preferences.get-preferences',
  ]);
  const [country, setCountry] = useState<CountryCode | string>('');
  const [state, setState] = useState('');
  const [unitPreference, setUnitPreference] =
    useState('metric');

  const { mutate: mutateLocation } = trpc.useMutation([
    'preferences.update-user-location',
  ]);

  const { mutate: mutateUnitPreferences } = trpc.useMutation([
    'preferences.update-user-unit-preference',
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((old) => !old);
  };

  const handleLocationUpdate = () => {
    mutateLocation({ country, state });
  };

  const handleUnitPreferenceUpdate = () => {
    mutateUnitPreferences(unitPreference as UserUnitPreference);
  };

  useEffect(() => {
    if (userPreferences) {
      setCountry(() => userPreferences.country as string ?? '');
      setState(() => userPreferences.state as string ?? '');
      setUnitPreference(
        () => userPreferences.unitPref as UserUnitPreference ?? ''
      );
    }
  }, [userPreferences]);

  return (
    <div>
      <Head>
        <title>Preferences</title>
      </Head>

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
                <Label
                  htmlFor="stateValue"
                  value="State (optional)"
                  id="stateLabel"
                />
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
                  disabled={country?.length === 0 ? true : false}
                  onClick={() => handleLocationUpdate()}
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
                <p>Metric or Imperial?</p>
                <Select
                  onChange={(e) =>
                    setUnitPreference(e.target.value as UserUnitPreference)
                  }
                  value={unitPreference}
                  
                >
                  <option value="">Choose one</option>
                  <option value="metric">Metric units</option>
                  <option value="imperial">Imperial units</option>
                </Select>
              </div>
              <div className="col-span-3 md:col-span-2 col-end-7 md:col-end-6 place-self-end mt-3">
                <Button
                  disabled={unitPreference === "" ? true : false}
                  onClick={() => handleUnitPreferenceUpdate()}
                >
                  Save
                </Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        {/** vehicle preferences */}
        <Accordion.Panel>
          <Accordion.Title>Vehicles</Accordion.Title>
          <Accordion.Content>
            {/* <div className='flex justify-end px-10'>
              <Button color='success' onClick={() => router.push('/account/preferences/new-vehicle')}>Add new vehicle</Button>
            </div> */}
            <NewVehicleModal show={showModal} toggleModal={handleToggleModal} />
            {/* <VehicleTile /> */}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

UserPreferences.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default UserPreferences;
