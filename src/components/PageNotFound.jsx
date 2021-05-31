import { withRouter } from "react-router-dom";
import { Box, Button, Container, Typography } from "@material-ui/core";

function PageNotFound(props) {
  const goBackHandler = () => {
    console.log(props);
    props.history.goBack();
  };
  return (
    <Container>
      <Box>
        <Typography variant="h1">Page not found</Typography>
        <Button onClick={goBackHandler}>Go Back</Button>
      </Box>
    </Container>
  );
}
export default withRouter(PageNotFound);
