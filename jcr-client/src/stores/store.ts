import { createContext, useContext } from "react";
import ProjectStore from "./projectStore";

interface Store {
    projectStore: ProjectStore    
}

export const store: Store = {
    projectStore: new ProjectStore()
}

export const StoreContext = createContext(store);

// simple react hook to use stores inside components

export function useStore() {
    return useContext(StoreContext);
}