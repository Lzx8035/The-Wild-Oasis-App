import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER /////
  const filterOption = searchParams.get("status");
  const filter =
    !filterOption || filterOption === "all"
      ? null
      : { field: "status", value: filterOption };
  // : { field: "status", value: filterOption, method: "gte" }; //TODO

  // SORT /////
  const sortByOption = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByOption.split("-");
  const sorter = !sortByOption ? null : { field, direction };

  // PAGINATION /////
  const page =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));

  // QUERY /////
  const {
    isLoading,
    data: { data: bookings, count } = {}, // !!!
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sorter, page], // Filter
    queryFn: () => getBookings({ filter, sorter, page }),
  });

  // PRE-FETCHING ///// !!!

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sorter, page + 1],
      queryFn: () => getBookings({ filter, sorter, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sorter, page - 1],
      queryFn: () => getBookings({ filter, sorter, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
