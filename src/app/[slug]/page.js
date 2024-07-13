import Login from "@/components/Login"
import RootLayout from "../layout"


export default async function Page({ params }) {
    // const { referral } = params
    // const pathname = usePathname()
    // const { address } = useAccount()
    // const data = [
    //     { link: '', address: address, amountOfInvest: 0, level: '1' }
    // ]
    // try {
    //     const link = 'https://aismart.liara.run' + pathname
    //     await axios.put('/api/editFriends', { data, link })
    // } catch (err) {
    //     console.log(err);
    // }
    return (
        <>
            <RootLayout>
                <Login />
            </RootLayout>
        </>
    )
}
