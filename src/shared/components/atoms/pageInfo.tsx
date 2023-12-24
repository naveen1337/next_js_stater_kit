interface Props {
    links: string[]
    name: string
}

export default function PageInfo(props: any) {
    return (
        <div className="bg-gray-300 py-1">
            <div className="container mx-auto">
                <div>
                    <p>Link / Link 2 / Link 3</p>
                </div>
                <p className="text-xl font-bold py-1">{props.name}</p>
            </div>
        </div>
    )
}