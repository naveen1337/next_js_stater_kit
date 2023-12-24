import TopBar from "../atoms/TopBar";
import PageInfo from "../atoms/pageInfo";
import NavBar from "../molecules/Navbar";

export default function AdminLayout(props: any) {
    return (
        <div className="">
            <TopBar />
            <NavBar />
            {props.children}
        </div>
    )
}