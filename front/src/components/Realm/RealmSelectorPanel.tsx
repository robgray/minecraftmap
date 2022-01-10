import { PrimaryButton, TextField, Stack, IStackItemStyles, IStackTokens } from 'office-ui-fabric-react';
import React from "react";
import { Realms } from './Realms';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useRealms } from '../../contexts/RealmsContext';

const stackItemStyles: IStackItemStyles = {
    root: {
      padding: 0,
      paddingTop: 20,
      paddingBottom: 40
    },
  };

const checkboxStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 20
};

interface IRealmSelectorPanel {
    dismissPanel: (() => void);
    openPanel: (() => void);
    isOpen: boolean;
}

const RealmSelectorPanel: React.FC<IRealmSelectorPanel> = (props: IRealmSelectorPanel) => {

    const { allRealms, currentRealm,  setCurrentRealm } = useRealms();
   
    return (
        <Panel
            headerText="Realm Selector"
            isOpen={props.isOpen}
            onDismiss={props.dismissPanel}
            closeButtonAriaLabel="Close">
            <Stack>
                <Stack.Item>
                    <TextField label="Current Realm" value={currentRealm.name} readOnly={true} />
                    <Realms 
                        value={currentRealm.id} onChange={(e, o) => {
                            if (o) setCurrentRealm(o.key.toString())
                            }} />
                </Stack.Item>
                <Stack.Item>
                <Stack horizontal>
                    <Stack.Item align="end" styles={stackItemStyles}>
                        <PrimaryButton text="Create" onClick={() => { 
                                props.dismissPanel();
                        }} />
                    </Stack.Item>
                </Stack>
                </Stack.Item>
            </Stack>
        </Panel>
    );
}

export { RealmSelectorPanel };