import { RaisedButton } from "../components";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";

export default function Login() {
	const { auth } = useContext(FirebaseContext);

  return (
    <div className="login container">
      <RaisedButton onClick={auth.login}>LOGIN</RaisedButton>
    </div>
  )
}
