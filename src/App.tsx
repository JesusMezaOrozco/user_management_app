import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HOME, LOGIN } from "./router/paths";

import Login from "./pages/Login";
import Home from "./pages/Home";

import { PublicRouter } from "./router/PublicRouter";
import { PrivateRouter } from "./router/PrivateRouter";
import { AuthContextProvider } from "./providers/AuthProvider";
import { FeedbackContextProvider } from "./providers/FeedbackProvider";

function App() {
  return (
    <FeedbackContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRouter />}>
              <Route path={LOGIN} element={<Login />} />
            </Route>
            <Route path={HOME} element={<PrivateRouter />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </FeedbackContextProvider>
  );
}

export default App;
