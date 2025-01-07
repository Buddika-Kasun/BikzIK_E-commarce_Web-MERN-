

const CardLoading = () => {
    return (
        <div className="border p-2 grid gap-1 max-w-40 rounded animate-pulse">
            <div className="min-h-20 bg-blue-100 rounded"></div>
            <div className="p-3 bg-blue-100 rounded w-20"></div>
            <div className="p-3 bg-blue-100 rounded"></div>
            <div className="p-3 bg-blue-100 rounded w-14"></div>
            <div className="flex items-center justify-between gap-2">
                <div className="p-3 bg-blue-100 rounded w-16"></div>
                <div className="p-3 bg-blue-100 rounded w-16"></div>
            </div>

        </div>
    );
}

export default CardLoading;