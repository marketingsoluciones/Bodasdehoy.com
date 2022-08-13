import { BlockFilter } from './BlockFilter';
import { FC, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Search } from '../../GoogleMaps/GoogleMapsField';
import { FiltersContextProvider } from '../../../context/FiltersContext';
import { geolocation } from '../../../interfaces';
import types from 'react-day-picker';



export const LocationFilter: FC = () => {
  const [libraries] = useState(['places', 'geometry']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_CONSOLE_GOOGLE ?? "",
    //@ts-ignore
    libraries,
  });
  const [geolocation, setGeolocation] = useState<geolocation>({
    lat: 40.416729,
    lng: -3.703339,
  })


  useEffect(() => {
    const success = (data: any) => {
      const geolocation = {
        lat: data?.coords?.latitude,
        lng: data?.coords?.longitude
      }
      data && setGeolocation(geolocation)
    }
    const error = (error: any) => {
      console.log(error)
    }
    if (window?.navigator) {
      window.navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])



  return (
    <BlockFilter label="Localidad">
      {isLoaded && <Search center={geolocation} slice={true}>
        <InstanceControl />
      </Search>}
    </BlockFilter>
  )
}



const InstanceControl: FC<{ selected?: string }> = ({ selected }) => {
  const { setFilters } = FiltersContextProvider()

  useEffect(() => {
    if (selected !== "") {
      //console.log("ciiiiiiiiiiiiiiiiiitttttii")
      setFilters({ type: "ADD_FILTER", payload: { city: selected } })
    } else {
      //console.log("ciiiiiiiiiiiiiiiiiitttttiiNNNNNNNNNNNNNN")
      //      setFilters({type: "RESET_FILTER", payload: ["city"]})
      setFilters({ type: "REMOVE_CHARACTERISTIC", payload: "city" })

    }

  }, [selected, setFilters])

  return (
    <>
    </>
  )
}

