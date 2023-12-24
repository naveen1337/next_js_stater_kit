import { NextLogo } from "../../icons/icon_manifest";

export default function AdminLayout(props: any) {
    return (
        <div className="bg-gray-300  ">
            <div className="container flex items-center justify-between py-1 mx-auto">
                <div className="sm:hidden">
                    <p>MENU</p>
                </div>
                <NextLogo />
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-800"></div>
                    <div>
                        <p>User Name</p>
                        <p>Role</p>
                    </div>
                </div>
            </div>
        </div>
    )
}