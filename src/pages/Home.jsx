import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Home(props) {
  const {showNav, setShowNav,input, countries } = props;
  const [filteredCountries, setFilteredCountries] = useState([]);
  const { continent } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    if (input) {
      const filtered = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      if (continent) {
        const filtered = countries.filter(
          (country) => country.region === continent
        );
        setFilteredCountries(filtered);
      }else { 
      setFilteredCountries(countries);
      }
    }
  }, [input, countries,continent]);

  return (
    <div className="w-full flex flex-col items-center mt-4 h-[full] dark:bg-[#202C36]">
      {filteredCountries.length !== 0 ? (
        filteredCountries.map((country, index) => (
          <div
            key={index}
            className="flex flex-col mb-14 dark:bg-[#2B3844] rounded-md bg-white"
            onClick={() => {
              setShowNav(false)
              if(continent){ 
              navigate(`/home/${continent}/country/${country.name.common}`)
              }else {
                navigate(`/home/country/${country.name.common}`)
              }
            }}
          >
            <img src={country.flags.png} alt="img" className="rounded-t-md" />
            <div className="pt-6 pl-6 pb-[46px]">
              <h1 className="mb-4 text-[#111517] dark:text-white">
                {country.name.common}
              </h1>
              <p className="text-[#111517] dark:text-white nunito text-[14px] font-[600]">{`Population: ${country.population.toLocaleString()}`}</p>
              <p className="text-[#111517] dark:text-white nunito text-[14px] font-[600]">{`Region: ${country.region}`}</p>
              <p className="text-[#111517] dark:text-white nunito text-[14px] font-[600]">{`Capital: ${country.capital}`}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}

export default Home;
