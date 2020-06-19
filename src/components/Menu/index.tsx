import { FC } from 'react'
import Menu,{MenuProps} from './menu';
import MenuItem,{MenuItemProps} from './menuItem';
import SubMenu,{SubMenuProps} from './subMenu';


export type IMenuComponent = FC<MenuProps> & {
    MenuItem: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.MenuItem = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu