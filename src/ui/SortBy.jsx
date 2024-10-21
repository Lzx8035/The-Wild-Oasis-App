import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ SortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={SortOptions}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
