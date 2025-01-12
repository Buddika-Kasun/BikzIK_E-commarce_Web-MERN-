import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router-dom";
import NoData from "../components/NoData";

const SearchPage = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const loadingArrayCard = new Array(10).fill(null);

    const params = useLocation();

    const searchTerm = params?.search?.slice(3);

    const fetchData = async() => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.search_product,
                data: {
                    search: searchTerm,
                    page: page,
                    limit: 10
                }
            });

            if (response.data.success) {
                setTotalPages(response.data.totalNoPage);

                if (response.data.page == 1) {
                    setData(response.data.data);
                }
                else {
                    setData((prev) => {
                        return [...prev, ...response.data.data];
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, searchTerm]);

    const fetchMore = () => {
        if (totalPages > page) {
            setPage(prev => prev + 1);
        }
    }

    return (
        <section>
            <div className="p-4">
                <p className="font-semibold">
                    Search Results: {loading ? <span className="text-sm text-gray-400">Loading...</span> : data.length}
                </p>

                {
                    !loading && !data[0] && (
                        <div className="">
                            <NoData />        
                        </div>
                    )
                }

                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={true}
                    next={fetchMore}
                >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">

                    {
                        data.map((product, index) => (
                            <CardProduct key={index} data={product} />
                        ))
                    }

                    {
                        loading && (
                            loadingArrayCard.map((_, index) => (
                                <CardLoading key={index} />
                            ))
                        )
                    }

                </div>
                </InfiniteScroll>
            </div>
        </section>
    );
}

export default SearchPage;