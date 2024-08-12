
import { createRoot } from "react-dom/client";

import App from "./App";
import TableView from "./TableView";
import GetEmployers from "./GetEmployees"
import GetManager from "./GetManager"
import SimpleTree from "./SimpleTree"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import GetEmployeeById from "./GetEmployeeById";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form" element={<App />} />
          <Route path="/getEmployeeById" element={<GetEmployeeById />} />
         <Route path="/getManagers" element={<GetManager />} />
          <Route path="/getEmployers" element={<GetEmployers />} />
          <Route path="/simpleTree" element={<SimpleTree />} />
          <Route path="/TableView" element={<TableView />} />
        </Routes>
      </BrowserRouter>
    
    
    </div>);