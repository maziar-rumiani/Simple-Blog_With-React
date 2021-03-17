import {useState,useEffect} from 'react';
const useFetch = (url) => {
    const [data,setData]=useState(null);
    // const[name,setName]=useState('rumi');
    const [isPending,setIspending]=useState(true);
    const [error,setError] = useState(null);


    useEffect(()=>{
        const abortCount = new AbortController();

        setTimeout(() => {
            fetch(url,{signal: abortCount.signal})
                .then(res=>{
                    if(!res.ok){
                    throw Error('Could not fetch the data from the server.');
                }
            return res.json();
            })
            .then((data)=>{
                setData(data);
                setIspending(false);
                setError(null)
            })
            .catch((err)=>{
                if(err.name=='AbortError'){
                    console.log('fetch aborted');
                }
                setIspending(false)
                setError(err.message);
            })
    },1000);
    return () => abortCount.abort();
    },[url]);
    return {data,isPending,error};
}
 
export default useFetch;