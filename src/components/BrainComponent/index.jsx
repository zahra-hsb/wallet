import Image from "next/image"
import Brain from '../../../public/bg/OIG1.png'
import Line from '../../../public/img/Line callout 18 3.png'
import Line1 from '../../../public/img/Line callout 18 2.png'
// import styles from '../../../styles/Home.module.css';

const BrainComponent = () => {
    return (
        <>
            <Image src={Brain} alt='' className={'w-full'} />
            <div className='relative text-[#bbb]'>
                <Image src={Line} alt='' className={'w-1/2 -mt-[60%] translate-x-[14%]'} />
                <p className='absolute bottom-[30%] left-[15%] text-sm w-[120px] '>
                    Invest usdt and matic
                </p>
            </div>
            {/* <Image src={Line1} alt='' className={styles.line1} /> */}
            <div className='relative text-[#bbb]'>

                <Image src={Line1} alt='' className={'w-1/2 translate-x-[93%] -mt-[50%] relative'} />
                <p className='absolute bottom-[34%] right-[13%] text-sm w-[120px] text-right '>
                    Get 1.5 daily profit
                </p>
            </div>
            <div className='relative text-[#bbb]'>
                <Image src={Line} alt='' className={'w-1/2 -mt-[50%] translate-x-[14%]'} />
                <p className='absolute bottom-[27%] left-[17%] text-xs max-w-[150px] w-[120px] '>
                    Ai Wont Replace Humans
                    But Humans With Ai Will
                    Replace Humans Without Ai
                </p>
            </div>
        </>
    )
}

export default BrainComponent