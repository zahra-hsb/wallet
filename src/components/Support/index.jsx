import Container from "../Container"
import styles from '../../app/Home.module.css';

const Support = () => {
    return (
        <>
            <section className={styles.section} style={{ bottom: 0, height: 100 + 'vh' }}>
                <Container>
                    <form className="w-full flex flex-col gap-3 items-start">
                        <p>Submit a Ticket</p>
                        <div className="flex flex-col w-full gap-1">
                            <label>Subject</label>
                            <input type="text" className="p-2 rounded" placeholder="Enter Subject" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Details</label>
                            <input type="text" className="p-2 rounded" placeholder="Explain your problem" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Email</label>
                            <input type="email" className="p-2 rounded" placeholder="Enter your Email" />
                        </div>
                        <div className="flex gap-1 justify-start w-full">
                            <input type="checkbox" id="remember" className="rounded" />
                            <label htmlFor="remember" className="text-[#00FF5E]">Remember this choice as default</label>
                        </div>
                        <div className="w-full text-center">
                            <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center">Submit</button>
                        </div>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default Support