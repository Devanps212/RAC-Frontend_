type OnSearchFunction = (searchTerm: string) => void;

export interface SearchOneProps {
  onSearch: OnSearchFunction;
}