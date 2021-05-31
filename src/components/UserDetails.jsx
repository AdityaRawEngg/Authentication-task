import { Box, Typography } from "@material-ui/core";
import Editor from "./SunEditor";
export default function UserDetails({ user }) {
  return (
    <Box>
      {/* <Typography variant="h2" align="center" color="textSecondary">
        Profile
      </Typography>
      <Typography variant="h3" align="center" color="textSecondary">
        Name: {user.name}
      </Typography>
      <Typography variant="h3" align="center" color="textSecondary">
        Email: {user.email}
      </Typography>
      <Typography variant="h3" align="center" color="textSecondary">
        Phone: {user.phone}
      </Typography> */}
      <Editor />
    </Box>
  );
}
