import React, { useEffect, useState} from "react";
import { fetchListData } from "../apiServices";

const ListContainer = () => {
    const [listData, setListData]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await fetchListData();
                setListData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
        },[]);

        if (isLoading) {
            return <>Loading...</>
        }

        if (error) {
            return <>Error fetching data</>
        }
        
        return (
            <>
            <h1>hello world</h1>
            </>
        )
};

export default ListContainer