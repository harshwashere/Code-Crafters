import { RxCross1 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import './search.css'
import { NavLink } from "react-router-dom";
const Search = () => {
    return (
        <>
            <div className="searchBox active">
                <div className="searchBoxCard">
                    <NavLink to="" className="searchBoxClose">
                        <RxCross1 />
                    </NavLink>
                    <div className="searchBoxInner">
                        <div className="searchBoxLogo">
                            {/* <img src="images/logo/logo-white.png" alt="search" className="img-fluid" /> */}
                            <h1 className="img-fluid">Aai Cha Dabba</h1>
                        </div>
                        <div className="searchBoxForm">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <button type="button" className="btn btnSecondary"><IoMdSearch/> Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search