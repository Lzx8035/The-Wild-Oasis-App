import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (cabins.length === 0) return <Empty resourceName="cabins" />;

  // Filter
  const filterOption = searchParams.get("discount") || "all"; //!!!
  let filteredCabins;
  if (filterOption === "all") filteredCabins = cabins;
  if (filterOption === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterOption === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // SortBy
  const SortByOption = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = SortByOption.split("-"); //!!!
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
