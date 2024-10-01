import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins can not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // SAMPLE:https://pwrfjejoyxieuwfbpvni.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imageURL });

  if (error) {
    console.error(error);
    throw new Error("cabins can not be created");
  }

  // 2) Create image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin if there is error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin can not be created because theres is an erroe in image uploading"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins can not be deleted");
  }
}
