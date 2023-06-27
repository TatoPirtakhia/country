import { useEffect, useState } from "react";
import {
  useNavigate,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import Moon from "./assets/Moon";
import Search from "./assets/search";
import Arrow from "./assets/Arrow";
import getCountiesData from "./requests/getCountiesData";
import Country from "./pages/Country";

function App() {
  const [dark, setDark] = useState(false);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [region, setRegion] = useState("");
  const [filtertext, setFiltertext] = useState("Filter by Region");
  const [showNav, setShowNav] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (dark && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountiesData();
      setCountries(data);
    };

    fetchData();
  }, []);
  

  const switchDarkMode = () => {
    setDark((prevDark) => !prevDark);
  };

  const onClick = (e) => {
    if (region === e.target.textContent) {
      setRegion("");
      setFiltertext("Filter by Region");
      navigate(`/home`);
    } else {
      setFiltertext(e.target.textContent);
      setRegion(e.target.textContent);
      navigate(`/home/${e.target.textContent}`);
    }
  };

  return (
    <div className={`bg-white dark:bg-[#202C36] h-[100vh]`}>
      <nav className="w-full flex flex-col items-center ">
        <div className="w-full h-20 shadow-navShadow flex items-center pl-[5%] gap-[25%] bg-white dark:bg-[#2B3844]">
          <p className="nunito font-[800] text-[15px] text-[#111517] dark:text-white">
            Where in the world?
          </p>
          <div className="flex items-center gap-2" onClick={switchDarkMode}>
            <div>
              <Moon />
            </div>
            <p className="nunito font-[600] text-[13px] pt-1 text-[#111517] dark:text-white">
              Dark Mode
            </p>
          </div>
        </div>
        <div className={`w-full pl-[5%]  ${!showNav?"hidden":''}`}>
          <div className="shadow-inputShadow w-[90%] h-12 mt-[26px] flex items-center  pl-8 gap-6 rounded-[5px] bg-white dark:bg-[#2B3844]">
            <div>
              <Search />
            </div>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for a country…"
              className="outline-none dark:bg-[#2B3844] nunito font-[600] dark:text-white dark:placeholder-white"
            />
          </div>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-[62px] w-[200px] h-12 mt-8 shadow-filterShadow bg-white dark:bg-[#2B3844] rounded-md pl-6 text-[12px] relative"
          >
            <p className="text-[#111517] dark:text-white nunito text-[12px] font-[600] ">
              {filtertext}
            </p>
            <div>
              <Arrow dark={dark} />
            </div>

            <div
              className={`${
                showMenu
                  ? "absolute shadow-filterShadow bg-white flex flex-col w-[200px] pt-4 pl-6 top-16 left-0 rounded-md pb-4 gap-2 dark:bg-[#2B3844]"
                  : "hidden"
              } `}
            >
              <p
                onClick={onClick}
                className="text-[#111517] dark:text-white nunito text-[12px] font-[600]"
              >
                Africa
              </p>
              <p
                onClick={onClick}
                className="text-[#111517] dark:text-white nunito text-[12px] font-[600]"
              >
                Americas
              </p>
              <p
                onClick={onClick}
                className="text-[#111517] dark:text-white nunito text-[12px] font-[600]"
              >
                Asia
              </p>
              <p
                onClick={onClick}
                className="text-[#111517] dark:text-white nunito text-[12px] font-[600]"
              >
                Europe
              </p>
              <p
                onClick={onClick}
                className="text-[#111517] dark:text-white nunito text-[12px] font-[600]"
              >
                Oceania
              </p>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<Home showNav={showNav} setShowNav={setShowNav} input={input} countries={countries} />}
        />
        <Route
          path="/home/:continent"
          element={<Home showNav={showNav} setShowNav={setShowNav} input={input} countries={countries} />}
        />
        <Route
          path="/home/:continent/country/:country"
          element={<Country dark={dark} countries={countries} setShowNav={setShowNav}/>}
        />
        <Route
          path="/home/country/:country"
          element={<Country dark={dark} countries={countries} setShowNav={setShowNav}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
