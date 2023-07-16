import React, {Dispatch, SetStateAction} from "react";
import {Directory} from "./DirectoryManager";

export interface DirectoryContextType {
    directory: Directory,
    setDirectory: Dispatch<SetStateAction<Directory>>
}
export const DirectoryContext = React.createContext<DirectoryContextType | null>(null);