import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deteleBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deteleBookingApi,

    onSuccess: () => {
      toast.success("booking deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
