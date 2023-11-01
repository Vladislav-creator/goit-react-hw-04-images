import{ArrowTopButton} from './ArrowTopButton.module'
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
export function BackToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', ()=>{
            if(window.scrollY > 100){
                setBackToTopButton(true)
            }else{
                setBackToTopButton(false)
            }
        })
    },[])

const scrollUp =()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
return (
<div className='App'>
{backToTopButton &&(
    <ArrowTopButton
    onClick={scrollUp}
    >
        ^
    </ArrowTopButton>
)}
</div>
);
}

ArrowTopButton.propTypes = {
    onClick: PropTypes.func,
  };