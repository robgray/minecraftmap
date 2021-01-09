import { IIconProps, ActionButton } from 'office-ui-fabric-react';

interface IEditButtonProps
{
    onEdit: Function;
}

const EditButton: React.FC<IEditButtonProps> = (props: IEditButtonProps) => {

    const editIcon: IIconProps = { iconName: 'Edit' };
    return (
        <ActionButton iconProps={editIcon} 
            allowDisabledFocus 
            onClick={() => { props.onEdit() }}>
        </ActionButton>
    )
}

export { EditButton };