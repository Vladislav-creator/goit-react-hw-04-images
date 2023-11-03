import { useState } from 'react';
 import { toast } from 'react-toastify';

import { SearchbarHeader, Form, Button, Input } from './Searchbar.module';

export function Searchbar({ onSubmit }) {
  const [inputSearch, setInputSearch] = useState('');

  const handleInputChange = e => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }
    onSubmit(inputSearch);
    reset();
  };

  const reset = () => {
    setInputSearch('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputSearch}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
         <Button type="submit">
          <span>Search</span>
        </Button>
      </Form>
    </SearchbarHeader>
  );
}