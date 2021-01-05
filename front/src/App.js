import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Map from './components/MinecraftMap';
import React, { useState } from "react";
import { initializeIcons, Stack } from '@fluentui/react';
import { realm } from './api/testData';
import Sidebar from "./components/Sidebar";
import { DefaultPalette, Text,  } from 'office-ui-fabric-react'

function App() {
  initializeIcons();

  const [realmData, setRealmData] = useState(realm);
  const sidebarItemStyles = {
    root: {
      padding: 5,
      width: 320
    }
  }

  const mapStackItemStyles = {
    root: {
      display: "flex",
      paddingLeft: 5,
      width: "100%"
    }
  }

  return (
    <Stack horizontal>
      <Stack.Item styles={sidebarItemStyles} align="start">
        <Sidebar data={realmData}/>
      </Stack.Item>
      <Stack.Item styles={mapStackItemStyles} align="end">
        <Map data={realmData}  />
      </Stack.Item>
    </Stack>
  );
}   

export default App;
