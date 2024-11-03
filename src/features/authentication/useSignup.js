import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("account created successlly, plz check your email");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, signup };
}
