import React, { ReactElement, createContext, useContext, useMemo, useState } from "react";
import Tab, { TabProps } from "../tab";


interface TabsContextProps {

    currentTabIndex: number;
    tabs: TabProps[];
    onChange: (index: number) => void;
    children: ReactElement;

}

const Context = createContext<TabsContextProps>({
    currentTabIndex: 0,
    tabs: [],
    onChange: (index) => {},
    children: <></>
});

const useTabsContext = () => useContext(Context);


interface TabsPanelProps {

    prefix?: ReactElement;
    suffix?: ReactElement;

}

const TabsPanel = ({ prefix, suffix }: TabsPanelProps) => {

    const { currentTabIndex, tabs, onChange } = useTabsContext();

    return (
        <div className="kl-flex kl-flex-row kl-items-center gap-2">

            {prefix}

            <div className="kl-flex kl-flex-row kl-flex-1 kl-overflow-x-auto kl-no-scrollbar">

                {
                    tabs.map((tab, index) => {

                        const active = index == currentTabIndex;
                        const handleClick = () => {

                            if(tab.onClick){
                                tab.onClick();
                            }

                            onChange(index);

                        }

                        return <Tab {...tab} active={active} onClick={handleClick} />

                    })
                }

            </div>

            {suffix}



        </div>
    );

}

const TabsCurrent = () => {

    const { children } = useTabsContext();

    return children;

}

interface TabsProps {
    initalTabIndex?: number;
    onChange?: (index: number) => void,
    tabs: TabProps[],
    children: ReactElement;
}

const Tabs = ({ initalTabIndex = 0, onChange, tabs, children  }: TabsProps) => {

    const [currentTabIndex, setCurrentTabIndex] = useState(initalTabIndex);
    const currentTabChildren = useMemo(() => {

        const currentTab = tabs[currentTabIndex];
        const children = currentTab?.children ?? tabs[0].children; 

        return children;

    }, [currentTabIndex]);

    let contextValues: TabsContextProps = {

        currentTabIndex,
        onChange: (newIndex: number) => {

            setCurrentTabIndex(newIndex);

            if(onChange){
                onChange(newIndex);
            }

        },
        tabs,
        children: currentTabChildren

    }

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    );

}

export { Tabs, TabsPanel, TabsCurrent };