import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NotFound from "./components/not-found";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <>
            <NavBar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" component={Main} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="404" />
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </>
    );
}

export default App;
