import { IIconProps, ActionButton } from '@fluentui/react';

interface IEditButtonProps
{
    fontSize?: number;
    height?: number;
    onEdit: Function;
}

const EditButton: React.FC<IEditButtonProps> = (props: IEditButtonProps) => {

    const editIcon: IIconProps = { iconName: 'Edit', styles: { root: { fontSize: props.fontSize??10  } } };
    return (
        <ActionButton iconProps={editIcon} 
            allowDisabledFocus
            styles={props.height?{root: { height: props.height}}:undefined}
            onClick={() => { props.onEdit() }}>
        </ActionButton>
    )
}

export { EditButton };