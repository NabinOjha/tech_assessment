import React, { useState } from "react";

import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { colors, fontSize } from "../../common/theme";
import { loadRepos } from "../../redux/repos";

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const repoState = useSelector((state) => state.repo);

  const handleInputChange = (e) => setSearchInput(e.target.value);

  const handleSortChange = (option) => {
    dispatch(
      loadRepos({
        query: repoState.query,
        sort: option.sort,
        order: option.order,
        page: 0,
      })
    );
  };

  const handleSearch = () => {
    dispatch(loadRepos({ query: searchInput }));
  };

  return (
    <HeaderSection>
      <div className="search-control">
        <input
          className="search-input"
          value={searchInput}
          placeholder="Find repositories"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className={`search-btn ${searchInput.length ? "" : "disabled"}`}
        >
          Search
        </button>
      </div>

      <div>
        <Select
          options={sortOptions}
          styles={sortStyles}
          placeholder="Sort Results"
          onChange={handleSortChange}
        />
      </div>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;

  .search-control {
    .search-input {
      width: 400px;
      padding: 11px;
      border-radius: 3px;
      outline: none;
      border: none;
      box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.8);
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      font-size: 16px;
    }
    .search-btn {
      display: inline-block;
      box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.8);
      border: none;
      outline: none;
      padding: 12px 20px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: ${colors.primary};
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      font-size: 16px;

      &.disabled {
        opacity: 0.5;
      }
    }
  }
`;

const sortOptions = [
  { value: "most_stars", sort: "stars", order: "desc", label: "Most Stars" },
  { value: "least_stars", sort: "stars", order: "asc", label: "Least Stars" },
  { value: "most_forks", sort: "forks", order: "desc", label: "Most Forks" },
  { value: "least_forks", sort: "forks", order: "asc", label: "Least Forks" },
];

const sortStyles = {
  control: (styles) => ({
    ...styles,
    border: "none",
    padding: 0,
    fontSize: 16,
    minWidth: 200,
    boxShadow: "0 0 1.5px rgba(0, 0, 0, 0.8)",
  }),
  placeholder: (styles) => ({ ...styles, fontSize: 15 }),
  menu: (styles) => ({ ...styles, width: 200 }),
  option: (styles) => ({ ...styles, fontSize: 16 }),
  input: (styles) => ({ ...styles, fontSize: fontSize.small }),
};

export default Header;
