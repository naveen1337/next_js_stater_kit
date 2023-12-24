import { NextLogo } from "../../icons/icon_manifest";

export default function NavBar() {
    return (
        <div className="bg-gray-200">
            <div className="container mx-auto flex items-center">
                <p className="py-3 pr-6 hover:cursor-pointer ">Inventory</p>
                <p className="py-3 pr-6 hover:cursor-pointer ">Customers</p>
                <p className="py-3 pr-6 hover:cursor-pointer ">Orders</p>
                <p className="py-3 pr-0 hover:cursor-pointer ">Report</p>
            </div>
        </div>

    )
}