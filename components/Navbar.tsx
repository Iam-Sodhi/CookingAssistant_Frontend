import React from 'react';
import MobileSidebar from './MobileSidebar';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center p-4'>
        <MobileSidebar />
        <div className="flex w-full justify-end">
        </div>
    </div>
}
export default Navbar;