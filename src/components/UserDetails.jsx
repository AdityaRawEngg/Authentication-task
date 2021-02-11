import { Box, Typography } from "@material-ui/core";
export default function UserDetails({ user }) {
  return (
    <Box>
      <Typography variant="h3" align="center" color="textSecondary">
        Profile
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary">
        Name: {user.name}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary">
        Email: {user.email}
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary">
        Phone: {user.phone}
      </Typography>
    </Box>
  );
}
