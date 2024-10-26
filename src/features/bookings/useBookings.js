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

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookinga", filter, sorter], // Filter
    queryFn: () => getBookings({ filter, sorter }),
  });

  return { isLoading, error, bookings };
}
