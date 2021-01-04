import { IIconProps, ActionButton } from 'office-ui-fabric-react';

interface IDeleteButtonProps
{
    onDelete: Function;
}

const DeleteButton: React.FC<IDeleteButtonProps> = (props: IDeleteButtonProps) => {

    const deleteIcon: IIconProps = { iconName: 'Delete' };
    return (
        <ActionButton iconProps={deleteIcon} allowDisabledFocus onClick={() => { props.onDelete() }}></ActionButton>
    )
}

export { DeleteButton };