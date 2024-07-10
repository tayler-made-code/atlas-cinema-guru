import './movies.css'
import React from 'react'
import Input from '../general/Input'
import SearchBar from '../general/SearchBar'
import SelectInput from '../general/SelectInput'
import Tag from './Tag'

export default function Filter({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genre, setGenres, title, setTitle }) {
  return (
    <div className="filter">
      <div className="filter-left">
        <SearchBar title={title} setTitle={setTitle} />
        <div className="filter-inputs">
          <Input 
            label="Min Date:"
            type="number"
            className="date-input min-year"
            value={minYear}
            setValue={setMinYear}
          />
          <Input 
            label="Max Date:"
            type="number"
            className="date-input max-year"
            value={maxYear}
            setValue={setMaxYear}
          />
          <SelectInput
            label="Sort:"
            options={[
              { label: 'Latest', value: 'latest' },
              { label: 'Oldest', value: 'oldest' },
              { label: 'Highest Rated', value: 'highestrated' },
              { label: 'Lowest Rated', value: 'lowestrated' }
            ]}
            value={sort}
            setValue={setSort}
          />
        </div>
      </div>
      <div className="filter-right">
        <div className="genres">
          {['Action', 'Drama', 'Comedy', 'Biography', 'Romance', 'Thriller', 'War', 'History', 'Sport', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy'].map((genre) => (
            <Tag
              key={genre}
              genre={genre}
              setGenres={setGenres}
              genres={genre}
            />
          ))}
        </div>
      </div>
    </div>
  )
}