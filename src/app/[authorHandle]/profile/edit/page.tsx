"use client";

import type { AuthorProfileResponse } from "@/types/profile-edit";
import { redirect } from "next/navigation";
import EditProfileForm from "@ui/profile-edit/EditProfile";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProfilePage() { 
  const queryClient = useQueryClient();
  
  const authorProfile: AuthorProfileResponse | undefined = queryClient.getQueryData(["currentAuthor"]);
  
  if (!authorProfile) { 
    return redirect("/");
  }
  return (
    <EditProfileForm authorProfile={authorProfile} />
  )
}