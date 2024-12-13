import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        setIsSearchPage(location.pathname === "/search");
    }, [location]);

    const redirectToSearchPage = () => {
        // Navigate to the search page
        navigate("/search");
    }

  return (
    <div className="w-full min-w-[80vw] lg:min-w-[420px] border-2 overflow-hidden h-8 lg:h-9 rounded-lg flex items-center text-neutral-400 bg-gray-100 focus-within:border-primary-200 group">
        <div>
            <button className="flex items-center justify-center h-full p-2 cursor-default group-focus-within:text-primary-200">
                <IoSearch size={18} />
            </button>
        </div>

        <div className="w-full h-full">
            {
                !isSearchPage ? (
                    // Not in search page
                    <div onClick={redirectToSearchPage} className="w-full h-full cursor-text flex items-center">
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "sugar"',
                                1000,
                                'Search "biscuits"',
                                1000,
                                'Search "ice-cream"',
                                1000,
                                'Search "eggs"',
                                1000,
                                'Search "cheese"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "pasta"',
                                1000,
                                'Search "meats"',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            autoFocus={true}
                            className="w-full h-full focus:outline-none bg-transparent flex items-center"
                        />
                    </div>
                )
            }
        </div>
        
    </div>
  )
}

export default Search;