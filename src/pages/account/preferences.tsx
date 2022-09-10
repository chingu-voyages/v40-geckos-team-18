import { Accordion, Button, Label, Select, Spinner, Toast } from 'flowbite-react';
import React, { ReactElement, useEffect, useState } from 'react';
import AccountLayout from '../../layouts/AccountLayout';
import { CountryCode } from '../../schema/electricity.schema';
import { NextPageWithLayout } from '../_app';
import StatesData from '../../AppData/states.json';
import Head from 'next/head';
import { trpc } from '../../utils/trpc';
import { UserUnitPreference } from '../../schema/preferences.schema';
import NewVehicleModal from '../../components/Account/Preferences/NewVehicleModal';
import UserVehicles from '../../components/Account/Preferences/UserVehicles';
import { HiCheck } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const UserPreferences: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: userPreferences } = trpc.useQuery([
    'preferences.get-preferences',
  ]);

  const [country, setCountry] = useState<CountryCode | string>('');
  const [state, setState] = useState('');
  const [unitPreference, setUnitPreference] = useState('metric');

  const { mutate: mutateLocation } = trpc.useMutation(
    ['preferences.update-user-location'],
    {
      onSuccess() {
        setSavedLocation((old) => !old);
      },
    }
  );

  const { mutate: mutateUnitPreferences } = trpc.useMutation(
    ['preferences.update-user-unit-preference'],
    {
      onSuccess() {
        setSavedUnitPreference((old) => !old);
      },
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [savedLocation, setSavedLocation] = useState(false);
  const [savedUnitPreference, setSavedUnitPreference] = useState(false);

  const handleToggleModal = () => {
    setShowModal((old) => !old);
  };

  const handleCountryFieldUpdate = (countryCode: CountryCode) => {
    setCountry(() => countryCode);
    setSavedLocation(() => false);
  };

  const handleStateFieldUpdate = (stateCode: string) => {
    setState(() => stateCode);
    setSavedLocation(() => false);
  };

  const handleLocationUpdate = () => {
    mutateLocation({ country, state });
  };

  const handleUnitPreferenceFieldChange = (unitPreference: string) => {
    setUnitPreference(() => unitPreference);
    setSavedUnitPreference(() => false);
  };

  const handleUnitPreferenceUpdate = () => {
    mutateUnitPreferences(unitPreference as UserUnitPreference);
  };

  useEffect(() => {
    if (userPreferences) {
      setCountry(() => (userPreferences.country as string) ?? '');
      setState(() => (userPreferences.state as string) ?? '');
      setUnitPreference(() => userPreferences.unitPref as UserUnitPreference);
    }
  }, [userPreferences, router]);

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  if (status === 'loading')
    return (
      <div className='flex justify-center items-center'>
        <Spinner />
      </div>
    );

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
                  onChange={(e) =>
                    handleCountryFieldUpdate(e.target.value as CountryCode)
                  }
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
                  onChange={(e) => handleStateFieldUpdate(e.target.value)}
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
                  color={savedLocation ? 'success' : 'info'}
                >
                  {savedLocation ? (
                    <div className="flex flex-row items-center gap-2">
                      <HiCheck /> Saved
                    </div>
                  ) : (
                    'Save'
                  )}
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
                    handleUnitPreferenceFieldChange(
                      e.target.value as UserUnitPreference
                    )
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
                  disabled={unitPreference === '' ? true : false}
                  onClick={() => handleUnitPreferenceUpdate()}
                  color={savedUnitPreference ? 'success' : 'info'}
                >
                  {savedUnitPreference ? (
                    <div className="flex flex-row items-center gap-2">
                      <HiCheck /> Saved
                    </div>
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        {/** vehicle preferences */}
        <Accordion.Panel>
          <Accordion.Title>Vehicles</Accordion.Title>
          <Accordion.Content>
            <div className="flex flex-col items-center md:items-start md:flex-row md:justify-space gap-2">
              <NewVehicleModal
                show={showModal}
                toggleModal={handleToggleModal}
              />
              <UserVehicles />
            </div>
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
