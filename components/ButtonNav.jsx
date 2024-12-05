import { useRouter } from 'next/router'
import usePortafolios from '../hook/usePortafolios'



function ButtonNav({name="",id, style={},icon={},directionPath="/"}) {

    const {comprobarRuta} = usePortafolios()
    const router = useRouter()
    
  
    

  

  return (
    <>

    <button style={{backgroundColor:`${comprobarRuta(id,router)}`}} id={id} onClick={()=>{router.push(directionPath)}} type='button' className={` efect shadow-none text-white flex text-2xl w-fit md:text-xl items-center jus rounded-md px-2 py-3 h-4/6 hover:text-black gap-1 ${style.button??""}`} >
        {name}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-current" dangerouslySetInnerHTML={{ __html: icon.src }} />
    </button>


    </>
  )
}

export default ButtonNav