import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

// Component check administrator
const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>you are not an administrator</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
