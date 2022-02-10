import { useState, useEffect, useRef } from 'react';
import { api } from '../api';

interface propsUseFetch {
    query : string | undefined
    variables: object | undefined
    config?: object | undefined
}

const useFetch = ({query, variables, config = {}} : propsUseFetch) => {
  const isMounted = useRef(true);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      setError(false)
        const {data : {data}} = await api.graphql({query, variables}, config)
        setData(Object.values(data)[0])
        console.log(data)
    } catch (error) {
        isMounted.current && setError(true)
        console.log(error)
    } finally {
        setLoading(false)
    }
  }


  useEffect(() => {
    fetchData()
  }, [query]);
  
    return [data, loading, error, fetchData]
};

export default useFetch;
