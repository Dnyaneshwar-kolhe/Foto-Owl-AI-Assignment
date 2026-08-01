import React from "react";
import { Sparkles, RefreshCw } from "lucide-react";
// import { useUserIdentity } from '../../hooks/useUserIdentity'
// import useAppStore from '../../store/useAppStore'
// import Avatar from '../ui/Avatar'
function Header() {
    // const { userName, userColor } = useUserIdentity();
    // const regenerateIdentity = useAppStore((s) => s.regenerateIdentity);


    return (
        <header className="sticky top-0 z-30 w-full glass border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6">
   
            <div className="flex items-center gap-2 text-white">
                <img
                    src="/logo.svg"
                    alt="Foto Owl AI Logo"
                    className="w-25 h-10"
                />
            </div>
       
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end mr-1">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                      User
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                        {/* {userName} */}
                    </span>
                </div>

                <button
                    // onClick={regenerateIdentity}
                    className="group relative"
                    title="Regenerate identity"
                >
                    {/* <Avatar name={userName} color={userColor} size="md" /> */}

                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3.5 h-3.5 text-white" />
                    </div>
                </button>
            </div>
        </header>
    )
}

export default React.memo(Header);