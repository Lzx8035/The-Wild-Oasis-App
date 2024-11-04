import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
// import CabinTable from "../features/cabins/CabinTable";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login in to your account</Heading>
      <LoginForm />

      {/* <CabinTable /> That is why we need to protect the data base */}
    </LoginLayout>
  );
}

export default Login;
