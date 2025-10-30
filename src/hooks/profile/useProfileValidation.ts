import type { AuthorProfileResponse, SocialLink } from "@/types/profile-edit";

export interface ProfileData {
  handle: string;
  name: string;
  contact: string;
  birth_date: string;
  short_bio?: string;
  location?: string;
  expertise_area?: string;
  about_self?: string;
  social_links?: SocialLink[];
  profile_picture?: File | null;
  cover_photo?: File | null;
}

export interface ValidationErrors {
  handle?: string;
  name?: string;
  contact?: string;
  birth_date?: string;
  short_bio?: string;
  location?: string;
  expertise_area?: string;
  about_self?: string;
  social_links?: Record<number, string>;
}

export const useProfileValidation = () => {
  const validateProfileData = (data: ProfileData): ValidationErrors => {
    const errors: ValidationErrors = {};

    const handleRegex = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/;

    if (!data.handle || data.handle.trim().length === 0) {
      errors.handle = "Handle is required";
    } else if (data.handle.length > 30) {
      errors.handle = "Handle must be 30 characters or less";
    } else if (!handleRegex.test(data.handle)) {
      errors.handle =
        "Handle can only contain lowercase letters, numbers, and may include '_' or '-', but cannot start or end with them.";
    }
    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (data.name.length > 100) {
      errors.name = "Name must be 100 characters or less";
    }

    // Validate contact
    if (!data.contact || data.contact.trim().length === 0) {
      errors.contact = "Contact is required";
    } else if (data.contact.length > 100) {
      errors.contact = "Contact must be 100 characters or less";
    }

    // Validate birth_date
    if (!data.birth_date) {
      errors.birth_date = "Birth date is required";
    }

    // Validate short_bio
    if (data.short_bio && data.short_bio.length > 200) {
      errors.short_bio = "Bio must be 200 characters or less";
    }

    // Validate location
    if (data.location && data.location.length > 100) {
      errors.location = "Location must be 100 characters or less";
    }

    // Validate expertise_area
    if (data.expertise_area && data.expertise_area.length > 100) {
      errors.expertise_area = "Expertise area must be 100 characters or less";
    }

    // Validate about_self
    if (data.about_self && data.about_self.length > 100) {
      errors.about_self = "About section must be 100 characters or less";
    }

    // Validate social links
    if (data.social_links && data.social_links.length > 0) {
      const socialErrors: Record<number, string> = {};
      data.social_links.forEach((link, index) => {
        if (!link.url || link.url.trim().length === 0) {
          socialErrors[index] = "URL is required";
        } else {
          const urlPattern =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          if (!urlPattern.test(link.url)) {
            socialErrors[index] = "Please enter a valid URL";
          }
        }
        // if (link.label && link.label.length > 10) {
        //   socialErrors[index] = "Label must be 10 characters or less"
        // }
      });
      if (Object.keys(socialErrors).length > 0) {
        errors.social_links = socialErrors;
      }
    }

    return errors;
  };

  const isValid = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length === 0;
  };

  return { validateProfileData, isValid };
};
