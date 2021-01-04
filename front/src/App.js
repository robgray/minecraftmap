import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useState } from "react";
import { initializeIcons, Stack } from '@fluentui/react';
import { realm } from './api/testData';
import Sidebar from "./components/Sidebar";

function App() {
  initializeIcons();

  const [realmData, setRealmData] = useState(realm);
  const sidebarItemStyles = {
    root: {
      width: "200px"
    }
  }
  
  return (
    <Stack horizontal>
      <Stack.Item styles={sidebarItemStyles}>
        <Sidebar data={realmData}/>
      </Stack.Item>
      <Stack.Item>
        <div id="map">
          <Map />
        </div>
      </Stack.Item>
    </Stack>
  );
}   

export default App;
