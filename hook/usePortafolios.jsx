import { useContext } from "react";
import PortafoliosContext from "../context/PortafoliosProvider";

function usePortafolios(){
    return useContext(PortafoliosContext)
}
export default usePortafolios