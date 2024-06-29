const Container = ({ children }) => {
    return (
        <>
            <div className='shadow-main text-white flex flex-col backdrop-blur-xl items-center gap-2 border border-[#00F0FF] rounded-2xl m-5 pt-3'>
                {children}
            </div>
        </>
    )
}

export default Container