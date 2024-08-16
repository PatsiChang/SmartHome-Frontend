import React, { PropsWithChildren, useEffect, useState } from "react";
import { AppStyleClassProp } from "@/components/basic/style/StyleProvider";
import BaseContainer from "@/components/basic/layout/BaseContainer";
import { BaseLargeText, BaseMiddleText, BaseParagraph } from "@/components/basic/layout/BaseText";
import BaseRow from "@/components/basic/layout/BaseRow";
import { FlatList, Image, Pressable, useWindowDimensions } from "react-native";
import BaseColumn from "@/components/basic/layout/BaseColumn";
import { addStyleBuilder, concatStyleClass, setStyleBuilders } from "@/lib/appStyleApi";
import { useStyle } from "@/hooks/styles/useStyle";
import BaseImg from "@/components/basic/layout/BaseImg";
import type { ListRenderItem } from "@react-native/virtualized-lists";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import BaseBlock from "@/components/basic/layout/BaseBlock";

export const LIST_DISPLAY_MODE_LIST =  0;
export const LIST_DISPLAY_MODE_ICON = 1;
export const LIST_DISPLAY_MODE_SIMPLE_LIST = 2;

export type BaseItemType = {
    id: string,
    url?: string,
    itemName?: string,
    itemDescription?: string,
    itemImgUri?: string,
    otherInfo?: any
}

export interface BaseItemListProps extends AppStyleClassProp{
    fetchItems: (pageNo: number, itemPerPage: number) => Promise<BaseItemType[]>,
    page ?: number,
    itemPerPage ?: number,
    enableSearch ?: boolean,
    displayMode ?: number
}

const BaseItemList = ({fetchItems, page = 1, itemPerPage = 10, styleClass, enableSearch = false,
                          displayMode = LIST_DISPLAY_MODE_LIST, ...props}: BaseItemListProps) => {
    const [itemList, setItemList] = useState<BaseItemType[]>([]);
    const itemListStyle = useStyle(...concatStyleClass("baseItemListItemList", styleClass));
    const router = useWrappedRouter();

    useEffect(() => {
        fetchItems(page, itemPerPage).then((items) => {
            setItemList(items);
        })
    }, []);

    const onPressFunction = (url : string) => {
        router.push(url);
    }

    const _renderItem = ({item}: { item: BaseItemType }) => {
        let itemRenderTemplate;
        if (displayMode == LIST_DISPLAY_MODE_ICON) {
            itemRenderTemplate = (
                    <BaseImg imageName={item.itemImgUri ? item.itemImgUri : ""}
                             styleClass={"baseItemListItemImg"}/>
            );
        } else if (displayMode == LIST_DISPLAY_MODE_SIMPLE_LIST) {
            itemRenderTemplate = (
                <BaseContainer styleClass={"baseItemListItem"}>
                    <BaseRow>
                        <BaseColumn styleClass={"baseItemListItemDescColumn"}>
                            <BaseRow>
                                <BaseLargeText>{item.itemName}</BaseLargeText>
                            </BaseRow>
                            <BaseRow>
                                <BaseParagraph>{item.itemDescription}</BaseParagraph>
                            </BaseRow>
                        </BaseColumn>
                    </BaseRow>
                </BaseContainer>
            );
        } else {
            itemRenderTemplate = (
                <BaseContainer styleClass={"baseItemListItem"}>
                    <BaseRow>
                        <BaseColumn styleClass={"baseItemListItemImgColumn"}>
                            <BaseImg imageName={item.itemImgUri ? item.itemImgUri : ""}
                                     styleClass={"baseItemListItemImg"}/>
                        </BaseColumn>
                        <BaseColumn styleClass={"baseItemListItemDescColumn"}>
                            <BaseRow>
                                <BaseLargeText>{item.itemName}</BaseLargeText>
                            </BaseRow>
                            <BaseRow>
                                <BaseParagraph>{item.itemDescription}</BaseParagraph>
                            </BaseRow>
                        </BaseColumn>
                    </BaseRow>
                </BaseContainer>
            );
        }

        return (
            <Pressable onPress={(e) => {if (item.url) onPressFunction(item.url)}}>
                { itemRenderTemplate }
            </Pressable>
        );
    }

    return (
        <BaseContainer styleClass={"baseItemList"}>
            <BaseRow styleClass={"baseItemListHeaderBar"}>
                <BaseColumn>
                    <BaseMiddleText>TODO Page / Item per page, use react-native-picker</BaseMiddleText>
                </BaseColumn>
                <BaseColumn>
                    {enableSearch
                        ? (<BaseMiddleText>TODO Search</BaseMiddleText>)
                        : null}
                </BaseColumn>
                <BaseColumn>
                    <BaseMiddleText>TODO Display mode</BaseMiddleText>
                </BaseColumn>
            </BaseRow>
            <BaseRow>
                <FlatList style={itemListStyle} data={itemList} renderItem={_renderItem}
                          numColumns={displayMode==LIST_DISPLAY_MODE_ICON ? 3 : 1}/>
            </BaseRow>
        </BaseContainer>
    )
}

export default BaseItemList;

addStyleBuilder("baseItemList", (config) => {
    return {
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

addStyleBuilder("baseItemListItemList", (config) => {
    return {
    }
});

addStyleBuilder("baseItemListHeaderBar", (config) => {
    return {
        backgroundColor: config.themeColorPalette.secondaryBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

addStyleBuilder("baseItemListItem", (config) => {
    return {
        borderBottomWidth: 1,
        borderColor: config.themeColorPalette.secondaryTextColor
    }
});

addStyleBuilder("baseItemListItemImg", (config) => {
    return {
        width: '30vh',
        height: '30vh'
    }
});

addStyleBuilder("baseItemListItemImgColumn", (config) => {
    return {
        flexGrow: 1
    }
});

addStyleBuilder("baseItemListItemDescColumn", (config) => {
    return {
        flexGrow: 2
    }
});
