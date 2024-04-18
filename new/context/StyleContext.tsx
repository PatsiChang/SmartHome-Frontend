import { createContext } from "react";
import { AppStylesSheet, buildAppStyleSheet } from "@/lib/appStyleApi";


export const StyleContext = createContext<AppStylesSheet>(buildAppStyleSheet());


