import { Stack, Text } from 'office-ui-fabric-react';
import React from "react";
import { Realms } from './Realms';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useRealms } from '../../contexts/RealmsContext';
import {
    getTheme,
    mergeStyleSets
  } from 'office-ui-fabric-react';

interface IRealmSelectorPanel {
    dismissPanel: (() => void);
    openPanel: (() => void);
    isOpen: boolean;
}

const RealmSelectorPanel: React.FC<IRealmSelectorPanel> = (props: IRealmSelectorPanel) => {

    const { currentRealm,  setCurrentRealm } = useRealms();
   
    return (
        <Panel
            headerText="Realm Selector"
            isOpen={props.isOpen}
            onDismiss={props.dismissPanel}
            closeButtonAriaLabel="Close">
            <Stack>
                <Stack.Item>
                    <div className={contentStyles.currentRealm}>
                        <Text variant="medium"><b>Current Realm</b></Text><br/>
                        {!currentRealm && (<Text variant="mediumPlus">Please set your realm</Text>)}
                        {currentRealm && (<Text variant="mediumPlus">{currentRealm.name}</Text>)}
                    </div>
                    <Realms 
                        value={currentRealm?.id||""} onChange={(e, o) => {
                            if (o) { 
                                setCurrentRealm(o.key.toString());
                                props.dismissPanel();
                            }
                            }} />
                </Stack.Item>
                
            </Stack>
        </Panel>
    );
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  currentRealm: {
    marginTop: "10px",
    marginBottom: "20px"
  }
});

export { RealmSelectorPanel };