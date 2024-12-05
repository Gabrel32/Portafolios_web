import { useRouter } from 'next/router';
import usePortafolios from '../hook/usePortafolios';
import ButtonNav from './ButtonNav';

function Navegacion() {
    const { comprobarRuta, buttonNavs } = usePortafolios();
    const router = useRouter();

    return (
        <>
            {buttonNavs.map((paramsButton, i) => (
                <ButtonNav 
                    key={paramsButton.id || i} // Usa un id único si existe, o el índice como último recurso
                    name={paramsButton.name} 
                    directionPath={paramsButton.directionPath} 
                    icon={paramsButton.icon} 
                    id={i + 1} 
                />
            ))}
        </>
    );
}

export default Navegacion;