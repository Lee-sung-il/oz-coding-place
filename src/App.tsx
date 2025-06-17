import Places from "./components/Places.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Places/>}/>
                <Route path="/places" element={<Places/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
