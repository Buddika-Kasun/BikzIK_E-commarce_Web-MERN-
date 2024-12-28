import { RiFileForbidLine } from "react-icons/ri";

const NoData = () => {
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <RiFileForbidLine size={80} />
            <p>Data not found!</p>
        </div>
    );
}

export default NoData;