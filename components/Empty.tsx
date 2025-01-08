import Image from 'next/image';
import React from 'react';

type EmptyProps = {
    label:string
};

const Empty:React.FC<EmptyProps> = ({label}:EmptyProps) => {
    
    return (
        <div className="h-full p-20 flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image  alt="Empty"
                fill src="/empty.png" />
            </div>
        </div>
    )
}
export default Empty;