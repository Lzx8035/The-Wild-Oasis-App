import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins can not be loaded");
  }

  return data;
}

export async function createAndEditCabin(newCabin, id) {
  // SAMPLE:https://pwrfjejoyxieuwfbpvni.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");

  const imageURL = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create OR Edit Cabin
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert({ ...newCabin, image: imageURL });
  }
  // 2. EDIT
  else {
    query = query.update({ ...newCabin, image: imageURL }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be created or updated");
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
