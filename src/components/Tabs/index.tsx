import { FC } from 'react'
import Tabs,{TabsProps} from './tabs';
import TabsItem,{TabsItemProps} from './tabsItem';


export type ITabsComponent = FC<TabsProps> & {
    TabItem: FC<TabsItemProps>,
}

const TransTabs = Tabs as ITabsComponent
TransTabs.TabItem = TabsItem

export default TransTabs