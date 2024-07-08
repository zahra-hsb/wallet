import Login from "@/components/Login"
import RootLayout from "../layout"

export default function Page({ params }) {
    // const { referral } = params
    // console.log(referral);
    return (
        <>
            <RootLayout>
                <Login />
            </RootLayout>
        </>
    )
}
