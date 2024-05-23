
import { Button, ButtonGroup } from "flowbite-react";
import '../../styles/nav.css'

export function Buttoncomp({className,children}) {
  return (
    <div className="flex flex-wrap gap-2  ">
     
     
     
     <Button color="gray   " className={className}>{children}</Button>
      
    </div>
  );
}
