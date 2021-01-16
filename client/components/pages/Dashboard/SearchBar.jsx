import React from 'react';
import styled from 'styled-components';
import { StyledFormInput } from '../../common';
import { Theme } from '../../../style/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StyledIcon } from '../../common';

const SearchSelect = styled(StyledFormInput)`
  opacity: 75%;
  width: 150px;
  padding: 0px 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 0.167s;

  &:hover {
    box-shadow: none;
    background-color: ${Theme.background};
  }
`;

const I = styled(StyledIcon)`
  height: 48px;
  width: 36px;
  border-radius: 0;
  border: 1px solid rgba(26, 26, 26, 0.3);
  margin: 8px 0px 16px 0px;
  border-right: 0;
  &:hover {
    background-color: ${Theme.secondary};
  }
`;

const SearchInput = styled(StyledFormInput)`
  width: 500px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  padding-left: 0px;

  &:hover {
    box-shadow: none;
  }
`;

const SearchBar = ({ searchInput, updateSearchInput, updateCategoryInput }) => {
  return (
    <div>
      <SearchSelect
        as="select"
        onChange={(e) => updateCategoryInput(e.target.value)}
      >
        <option value={'company'}>Company Name</option>
        <option value={'job_title'}>Position</option>
        <option value={'location'}>Location</option>
        <option value={'found_by'}>Found By</option>
        <option value={'how_applied'}>Applied Via</option>
        <option value={'url'}>URL</option>
        <option value={'notes'}>Notes</option>
        <option value={'app_status'}>App Status</option>
      </SearchSelect>
      <>
        <I>
          <FontAwesomeIcon icon={faSearch} />
        </I>
        <SearchInput
          value={searchInput}
          placeholder={`Search...`}
          onChange={(e) => updateSearchInput(e.target.value)}
        />
      </>
    </div>
  );
};

export default SearchBar;
