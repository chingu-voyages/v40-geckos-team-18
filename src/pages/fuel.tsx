import Link from 'next/link'
import Head from 'next/head'
import FuelForm from '../components/FuelUsed/FuelForm'

export default function FuelConsumption() {
  return (
    <div>
      <Head>
        <title>Fuel Consumption</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <img src="../assets/images/watering-plants.png" alt="" />
      <h2>How much carbon your fuel intake has emitted so far?</h2>
      <FuelForm />
  
    </div>
  )
}