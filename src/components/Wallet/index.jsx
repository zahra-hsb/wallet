'use client'
import { useRouter } from "next/navigation"
import Container from "../Container"

const Wallet = () => {
    const router = useRouter()
    return (
        <>
            <section className="py-20 bg-main">

                <Container>
                    <button onClick={() => router.push('/deposit')} className="py-1 px-6 border rounded-full shadow-main border-[#00F0FF]">Topup</button>

                </Container>
            </section>
        </>
    )
}

export default Wallet