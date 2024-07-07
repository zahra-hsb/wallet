import Deposit from "@/components/Deposit"
import MobileNav from "@/components/MobileNav"

const deposit = () => {
    return (
        <>
            <MobileNav />
            <section className="bg-main py-24 px-10 h-screen">
                <Deposit />
            </section>
        </>
    )
}

export default deposit