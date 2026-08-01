import React from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import useAppStore from '../../store/useAppStore'
import ActivityFeed from '../feed/ActivityFeed'

function Sidebar(){
    const isFeedOpen = useAppStore((s) => s.isFeedOpen);
    const toggleFeed = useAppStore((s) => s.toggleFeed);

    return(
        <>
        <aside className="hidden lg:block w-[320px] xl:w-[360px] h-full border-l border-white/5 bg-surface-card shrink-0">
            <ActivityFeed/>
        </aside>

        <div 
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-[340px] bg-surface-elevated shadow-2xl
                    transform transition-transform duration-300 ease-in-out lg:hidden pt-16
                    border-l border-white/10 flex flex-col
                    ${isFeedOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
       
        <button
          onClick={toggleFeed}
          className={`absolute top-20 -left-10 w-10 h-10 glass-strong rounded-l-xl
                      flex items-center justify-center text-text-muted hover:text-white
                      transition-all ${isFeedOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 shadow-xl'}`}
        >
          <PanelRightOpen className="w-5 h-5" />
        </button>

      
        <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-white/5">
          <span className="text-sm font-semibold">Activity</span>
          <button 
            onClick={toggleFeed}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-muted hover:text-white"
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ActivityFeed />
        </div>
      </div>


      {isFeedOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={toggleFeed}
        />
      )}
        
        </>

    )
}

export default Sidebar;