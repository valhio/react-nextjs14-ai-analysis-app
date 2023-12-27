// This component is used to wrap the content of the entire projext. Its purpose is to center the content and limit the width of the content to 1280px.

import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
    className,
    children,
}:{
    className?: string;
    children: React.ReactNode;
}) =>{
    return (
        <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper;