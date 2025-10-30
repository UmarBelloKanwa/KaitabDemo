"use client";

import { useState } from "react";
import type { ProfileData } from "./useProfileValidation";
import type { AuthorProfileResponse } from "@/types/profile-edit";
import { updateAuthorProfile } from "@/lib/api/author";

function getChangedFields(original: any, updated: any) {
  const changed: any = {};

  for (const key in updated) {
    const value = updated[key];
    const originalValue = original[key];

    // Special case for file fields
    if (key === "profile_picture" || key === "cover_photo") {
      // Only include if the updated value is actually a File
      if (value instanceof File) {
        changed[key] = value;
      }
      continue; // Skip default comparison logic for these fields
    }

    // Arrays (social_links, etc.)
    if (Array.isArray(value)) {
      if (JSON.stringify(value) !== JSON.stringify(originalValue || [])) {
        changed[key] = value;
      }
      continue;
    }

    // Objects
    if (typeof value === "object" && value !== null) {
      if (JSON.stringify(value) !== JSON.stringify(originalValue || {})) {
        changed[key] = value;
      }
      continue;
    }

    // Primitives
    if (value !== originalValue) {
      changed[key] = value;
    }
  }

  return changed;
}

export const useProfileSave = (authorProfile: AuthorProfileResponse) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveProfile = async (profileData: ProfileData) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const changedFields = getChangedFields(authorProfile, profileData);
    console.log("Changes Fields", changedFields);
    // If nothing changed, don't send request
    if (Object.keys(changedFields).length === 0) {
      console.log("No changes to save");
      setIsSaving(false);
      return;
    }
    try {
      const response = await updateAuthorProfile(changedFields);
      setSaveSuccess(true);
      return {
        success: true,
      }
     
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while saving";
      setSaveError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setIsSaving(false);
    }
  };

  const resetState = () => {
    setSaveError(null);
    setSaveSuccess(false);
  };

  return { saveProfile, isSaving, saveError, saveSuccess, resetState };
};
