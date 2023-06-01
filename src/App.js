import "sanitize.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { useFirebase, FirebaseContext } from "./firebase";

function App() {
  const { user, ...firebase } = useFirebase();
  return (
	<FirebaseContext.Provider value={{ user, ...firebase }}>
		{ user ? <Chat /> : <Login /> }
	</FirebaseContext.Provider>
  )
}

export default App;
