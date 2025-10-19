"use server";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ActionsButton from "@/components/ui/robook/ActionButtons";


// {
//   author_public_id: '3909ba0d-2f87-4954-9a8c-02ca8529059c',
//   user_public_id: 'a0f3bd6a-8435-43d2-bbfd-add619f9f2b0',
//   cover_photo_url: 'https://neqvzkaepzawrdpjzjrd.supabase.co/storage/v1/object/public/public-assets/a0f3bd6a-8435-43d2-bbfd-add619f9f2b0/books/b4c7fe77-ef19-4e71-ba7f-59675a18430f.pdf/cover_photo.jpg?',
//   name: 'Zero To One',
//   custom_topics: [],
//   uploaded_at: '2025-10-17T20:32:08.160667',
//   slug: 'zero_to_one',
//   public_id: 'b4c7fe77-ef19-4e71-ba7f-59675a18430f',
//   main_photo_url: 'https://neqvzkaepzawrdpjzjrd.supabase.co/storage/v1/object/public/public-assets/a0f3bd6a-8435-43d2-bbfd-add619f9f2b0/books/b4c7fe77-ef19-4e71-ba7f-59675a18430f.pdf/main_photo.jpg?',
//   description: 'A book for building the future',
//   updated_at: '2025-10-17T20:32:08.160693',
//   topics: [ 'Productivity' ],
//   followers_count: 0,
//   can_follow: false,
//   is_following: false,
//   author: {
//     public_id: '3909ba0d-2f87-4954-9a8c-02ca8529059c',
//     name: 'Umar Bello Kanwa',
//     profile_photo_url: 'https://neqvzkaepzawrdpjzjrd.supabase.co/storage/v1/object/public/authors/a0f3bd6a-8435-43d2-bbfd-add619f9f2b0/profilejpg?'
//   }
// }


const ProfileCard = ({ robook }: { robook: any }) => {
  console.log(robook, "in card") 
 if (!robook) {
    return <h1> Robook is not found </h1>;
  }
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        pt: 1,
        bgcolor:"background.default",
        //border: `1px solid ${theme.palette.divider}`,
        color: "text.primary",
        overflow: "hidden",
      }}
      elevation={0}
    >
      {/* Background Header */}
      <Box
        sx={{
          height: { xs: 200, sm: 200 },
          borderRadius: 1,
          backgroundImage: `url(${robook.main_photo_url})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      ></Box>

      <CardContent sx={{ p: 2, pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Name and Username */}
          <Box sx={{ mb: 1.5, flex: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              {robook.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              By {robook.author.name}
            </Typography>
          </Box>
          {/* Profile Avatar positioned over the background */}
          <Avatar
            src={robook.author.profile_picture}
            // alt={robook.author}
            sx={{
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              border: `1px solid divider`,
              bgcolor: 'grey.700',
              color: "primary",
              borderRadius: "15px",
            }}
          >
            {robook.author.name.charAt(0)}
          </Avatar>
        </Box>
        <Box sx={{ my: 1, width: { xs: "95%", md: "87%" } }}>
          {/* Bio */}
          <Typography
            variant="body2"
            sx={{
              color: "text.disabled",
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            {robook.description}
          </Typography>

          {/* Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography
              component="div"
              variant="caption"
              color="text.secondary"
            >
              {[...(robook.topics ?? []), ...(robook.custom_topics ?? [])].join(
                " - "
              )}
            </Typography>
          </Box>

          {/* Subscriber Count */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 2 }}
          >
            {robook.followers_count} followers
          </Typography>
        </Box>
        {/* Action Buttons */}
        <ActionsButton
          canFollow={robook.can_follow}
          robookPublicId={ robook.public_id} isFollowing={robook.is_following} />
        <Divider sx={{ borderColor: "divider", mb: 0 }} />
      </CardContent>
    </Card>
  );
}


export default ProfileCard;
