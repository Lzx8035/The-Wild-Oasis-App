import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterOption = searchParams.get("status");
  const filter =
    !filterOption || filterOption === "all"
      ? null
      : { field: "status", value: filterOption };
  // : { field: "status", value: filterOption, method: "gte" }; //TODO

  // SORT
  const sortByOption = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByOption.split("-");
  const sorter = !sortByOption ? null : { field, direction };

  // Pagination
  const page =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {}, // !!!
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sorter, page], // Filter
    queryFn: () => getBookings({ filter, sorter, page }),
  });

  return { isLoading, error, bookings, count };
}
