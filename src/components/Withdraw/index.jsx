import Image from "next/image"
import Container from "../Container"

const Withdraw = () => {
    return (
        <>
            <section className="py-20 bg-main">
                <Container>
                    <h3>Wallet Balance</h3>
                    <p>3210.00 USDT</p>
                    <div className="flex gap-3">
                        <button className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]">Deposit</button>
                        <button className="py-1 px-6 border rounded-full shadow-red border-[#FF2020]">Withdraw</button>
                    </div>
                </Container>
                <Container>
                    <p>Submit a withdrawal request</p>
                    <div className="flex flex-col w-full gap-1">
                        <label>Amount</label>
                        <input type="text" className="p-2 rounded" placeholder="Enter Amount" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label>Note</label>
                        <input type="text" className="p-2 rounded" placeholder="Enter notes (Optimal)" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label>Password</label>
                        <input type="text" className="p-2 rounded" placeholder="Enter your password" />
                    </div>
                    <div className="flex gap-1 justify-start w-full">
                        <input type="checkbox" id="remember" className="rounded" />
                        <label htmlFor="remember" className="text-[#00FF5E]">Remember this choice as default</label>
                    </div>
                    <button className="py-1 px-6 border rounded-full border-[#20FF44]">Submit</button>

                </Container>
                
                <div className='shadow-main text-white flex flex-col items-center gap-2 border border-[#00F0FF] rounded-2xl m-8 pt-3'>
                    <h3 className='font-bold text-lg'>Transactions</h3>
                    <div className='w-full flex flex-col items-center border border-[#00F0FF] rounded-2xl p-3'>
                        <div className="w-full flex justify-between">
                            <div className="flex">
                                <Image src={''} alt="" />
                                <span>
                                    <p>Commision</p>
                                    <p>14 Mar, 2021</p>
                                </span>
                            </div>
                            <span>
                                <p>n(Matic)</p>
                                <p>Amount</p>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Withdraw