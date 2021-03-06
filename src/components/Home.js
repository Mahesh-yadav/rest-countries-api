import React, {useState} from 'react';
import InputControls from './InputControls';
import CountryList from './CountryList';
import Loading from './Loading';
import styles from './home.module.css';

function Home({loading, countries, error}){

    const [searchValue, setSearchValue] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Filter by Region');

    const inSelectedRegion = (country) => {
        if(selectedFilter === 'Filter by Region') return true;

        return country.region === selectedFilter;
    }

    const matchSearch = (country) => {
        if(searchValue === '') return true;

        return country.name.toLowerCase().includes(searchValue.toLowerCase());
    }

    let element = null;

    if(loading){
        element = <Loading />
    } else if(error){
        element = <p>Error fetching countries</p>;
    } else if(countries){
        element = <CountryList countries={countries.filter((country) => inSelectedRegion(country)).filter((country) => matchSearch(country))}/>;
    }
    return(
        <div className={styles.Home}>
            <InputControls searchValue={searchValue} onSearchValueChange={setSearchValue} selectedFilter={selectedFilter} onChangeSelectedFilter={setSelectedFilter}/>
            {
                element
            }
        </div>
    );
}

export default Home;