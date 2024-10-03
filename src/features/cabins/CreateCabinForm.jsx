import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editedId, ...editValues } = cabinToEdit;

  const isEditForm = Boolean(editedId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditForm ? editValues : {},
  });
  // console.log(getValues());
  const { errors } = formState;

  // const queryClient = useQueryClient();
  const { isCreating, createCabin } = useCreateCabin();
  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createAndEditCabin,
  //   onSuccess: () => {
  //     toast.success("New cabin created successfully");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset(); // !!!
  //   },
  //   onError: (err) => toast.error(err.message),
  // });
  const { isEditing, editCabin } = useEditCabin();
  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   // the arrow fn below only accept one argument !!!
  //   mutationFn: ({ newCabin, id }) => createAndEditCabin(newCabin, id),
  //   onSuccess: () => {
  //     toast.success("Cabin edited successfully");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const isSubmitting = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditForm) {
      editCabin(
        { newCabin: { ...data, image }, id: editedId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset(data); // Fixed
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            // !!!
            console.log(data);
            reset();
          },
        }
      );
    }
  }

  function onError(err) {
    console.err(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isSubmitting}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isSubmitting}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isSubmitting}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isSubmitting}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isSubmitting}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isSubmitting}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        {/* TODO */}
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isSubmitting}
          {...register("image", {
            required: isEditForm ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Clean
        </Button>
        <Button disabled={isSubmitting}>
          {isEditForm ? "Edit Cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
