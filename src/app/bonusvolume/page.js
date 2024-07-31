import BonusVolume from "@/components/BonusVolume"
import InfoTable from "@/components/InfoTable"
import MobileNav from "@/components/MobileNav"

const bonusvolume = () => {
    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 min-h-screen h-full">
                <BonusVolume />
                <InfoTable />
            </div>
        </>
    )
}

export default bonusvolume