"use cient";
import ProfileCard from "@ui/author/ProfileCard";
import Container from "@mui/material/Container";
import RobooksList from "@ui/author/RobooksList";

export default function AuthorProfile() {
    return (
        <Container maxWidth="sm"
            sx={{
                // borderLeft: "1px solid",
                // borderRight: "1px solid",
                // borderColor: "divider",
                p: { xs: 2, sm: 2 },
                //bgcolor: "red"
            }}>
            <ProfileCard />
            <RobooksList />
        </Container>
    )
}