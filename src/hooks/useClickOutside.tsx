import {RefObject,useEffect} from 'react'

function useClickOutside(ref: RefObject<HTMLElement>,handler:Function) {
    useEffect(() => {
        const listener = (event:MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as HTMLElement)){
                return
            }
            handler(event)
        }
        window.addEventListener('click',listener)
        return () => {
            window.removeEventListener('click',listener)
        }
    }, [ref, handler])
}
export default useClickOutside