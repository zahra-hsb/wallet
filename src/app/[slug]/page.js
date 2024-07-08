import Login from "@/components/Login"
import RootLayout from "../layout"

export default function Page({ params }) {
    // const { referral } = params
    return (
        <>
            <RootLayout>
                <Login />
            </RootLayout>
        </>
    )
}
