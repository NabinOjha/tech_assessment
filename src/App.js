import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Homepage from "./components/Homepage";
import RepoDetail from "./components/Repos/RepoDetail";
import { Container } from "./common/style";

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/repos" element={<Homepage />} />
          <Route path="/repos/:owner/:repo" element={<RepoDetail />} />
          <Route path="/" element={<Navigate replace to="/repos" />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
