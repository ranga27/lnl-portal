import React, { useContext } from "react"
import App from '../components/App';
import { AuthContext } from '../components/context/AuthContext';

export default function Home() {
  const { userData } = useContext(AuthContext);
  console.log(userData);
  return (
    <App>
      <p>Index Page</p>
    </App>
  );
}
