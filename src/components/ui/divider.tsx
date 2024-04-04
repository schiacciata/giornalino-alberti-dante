import { FC } from 'react'

interface DividerProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

const Divider: FC<DividerProps> = ({ children, ...props }) => {
    return (
        <span className="relative flex justify-center">
            <div
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
            />
            <span className="relative z-10 mx-6" {...props}>
                {children}
            </span>
        </span>
    )
}

export default Divider