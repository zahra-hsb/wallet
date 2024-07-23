import Guide from "@/components/Guide"
import MobileNav from "@/components/MobileNav"

const guide = () => {
    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 min-h-screen h-full">
                <Guide />
            </div>
        </>
    )
}

export default guide