import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import plantingTreesImage from '../assets/images/planting-trees-1.png'
import FuelForm from '../components/Fuel/FuelForm'


export default function FuelPage() {
  return (
    <div className='p-8'>
      <Head>
        <title>Fuel Consumption</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className='flex justify-center'>
        <Image src={plantingTreesImage} alt="Four people planting trees"/>
      </div>

      <h2 className='text-4xl flex justify-center gap-4 w-100'>How much carbon your fuel intake has emitted so far?</h2>

      <div  className="container flex justify-center p-4">
        <FuelForm />
      </div>
     

    </div>
  )
}