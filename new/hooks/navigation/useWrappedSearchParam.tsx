import {useGlobalSearchParams, useLocalSearchParams} from "expo-router";

export const useWrappedSearchParam  = () => useGlobalSearchParams();

export const useWrappedLocalSearchParam  = () => useLocalSearchParams();