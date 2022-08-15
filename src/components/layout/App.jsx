import React from 'react';
import Header from './Header';
import AuthRoute from "../context/authRoute"

const App = ({ children }) => (
  
  <AuthRoute>
  <main>
    <Header />
    {children}
  </main>
  </AuthRoute>

);

export default App;
