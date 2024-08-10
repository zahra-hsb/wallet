import { useState } from "react";


const ReferralBox = ({ err, refCode, select, index }) => {
    const [isCopied, setCopy] = useState()
    var textArea,
    copy;
    
    function isOS() {
        return navigator.userAgent.match(/ipad|ipod|iphone/i);
    }
    

   
    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }
    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }
    function copy(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };
    async function copyRefCode() {
        copy(refCode)
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000)
    }
    return (
        <>
            <div className='border shadow-main text-white border-[#00F0FF] rounded-3xl flex items-center flex-col p-6 gap-5 my-3'>
                <p className='font-bold text-xl'>Referral {index + 1}</p>
                <button onClick={copyRefCode} className='border cursor-pointer border-[#00F0FF] py-1 px-7 rounded-3xl shadow-main'>Click to Copy!</button>
                {isCopied && <p className='text-[#00F0FF]'>Referral code copied! (Didn`t get your code on iphone? use the link below👇)</p>}
                <input type="text" onClick={(e) => select(e)} className="w-full p-2 rounded placeholder:italic text-gray-800 outline-none" contentEditable={false} placeholder={'click on copy button to get the referral code!'} value={refCode} />
            </div>

        </>
    )
}

export default ReferralBox