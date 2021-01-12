import { IIconProps, ActionButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { useId, useBoolean } from '@uifabric/react-hooks';

interface IDeleteButtonProps
{
    fontSize?: number;
    height?: number;
    identifyingName?: string;
    onDelete: Function;
}

const dialogStyles = { main: { maxWidth: 450 } };


const DeleteButton: React.FC<IDeleteButtonProps> = (props: IDeleteButtonProps) => {

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Confirm Location Delete',
        closeButtonAriaLabel: 'Close',
        subText: `Do you want to delete ${props.identifyingName?"'"+props.identifyingName+"'":"this location"}?`,
      };

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const deleteDialogId: string = useId('deleteDialog');
    const subTextId: string = useId('subTextLabel');

    const confirmDelete = () => {
        props.onDelete();
        toggleHideDialog();
    }

    const modalProps = React.useMemo(
        () => ({
          titleAriaId: deleteDialogId,
          subtitleAriaId: subTextId,
          isBlocking: false,
          styles: dialogStyles
        }),
        [deleteDialogId, subTextId],
      );

    const deleteIcon: IIconProps = { iconName: 'Delete', styles: { root: { fontSize: props.fontSize??10 } } };
    return (
        <>
            
            <ActionButton iconProps={deleteIcon} 
                allowDisabledFocus 
                styles={props.height?{root: { height: props.height}}:undefined}
                onClick={toggleHideDialog}>
            </ActionButton>
            <Dialog
                    hidden={hideDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={confirmDelete} text="Delete" />
                        <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
        </>
    )
}

export { DeleteButton };