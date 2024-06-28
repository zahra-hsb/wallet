import ActivityDashboard from "@/components/ActivityDashboard"
import MobileNav from "@/components/MobileNav"
import Referral from "@/components/Referral"

const referral = () => {
    return (
        <>
            <MobileNav />
            <section className="bg-main py-24 px-10">
                <Referral />
                <ActivityDashboard />
            </section>
        </>
    )
}

export default referral