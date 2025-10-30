"use server";

import { getCurrentAuthorProfile } from "@/actions/author";
import type { AuthorProfileResponse } from "@/types/profile-edit";
import { redirect } from "next/navigation";
import EditProfileForm from "@ui/profile-edit/EditProfile";

export default async function EditProfilePage() { 
  let authorProfile: AuthorProfileResponse | null = null;
  try {
    authorProfile = await getCurrentAuthorProfile();
    // console.log("Current author profile:", authorProfile);
  } catch(err) {
    console.log("Error fetching current author profile:")
  }
  if (!authorProfile) { 
    return redirect("/");
  }
  return (
    <EditProfileForm authorProfile={authorProfile} />
  )
}