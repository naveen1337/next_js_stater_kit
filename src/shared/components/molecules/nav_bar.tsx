import { NextLogo } from "../../icons/icon_manifest";

export default function NavBar() {
    return (
        <div className="flex py-6 item-center justify-between">
            <div className="flex items-center">
                <NextLogo />
                <div className="flex px-8 items-center space-x-6">
                    <p className="text-gray-500 text-[14px] font-medium">Showcase</p>
                    <p className="text-gray-500 text-[14px]  font-medium">Blog</p>
                    <p className="text-gray-500 text-[14px]  font-medium">Analytics</p>
                    <p className="text-gray-500 text-[14px]  font-medium">Enterprise</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button className="border py-2 px-7 text-gray-500 text-[14px]  font-medium px-3 rounded-lg">Feedback</button>
                <button className=" py-2 px-7 bg-[#0070f3] text-[14px]  font-medium text-white rounded-lg">Learn</button>
            </div>
        </div>
    )
}