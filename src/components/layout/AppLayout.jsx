import React from "react";
import Header from './Header';
import Sidebar from './Sidebar';
// import ImageModal from '../gallery/ImageModal';

// @param {Object} props
// @param {React.ReactNode} props.children


function AppLayout({children}){
    return(
     <div className="flex flex-col h-screen w-full overflow-hidden bg-surface relative">
        <Header/>
        <main className="flex-1 flex overflow-hidden relative">
            <div className="flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth">
                <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
                    {children}

                </div>

            </div>
         <Sidebar/>
        </main>

    {/* <ImageModal/> */}
     </div>

    )
}

export default AppLayout;