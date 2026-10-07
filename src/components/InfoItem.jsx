function InfoItem({ Icon, label, title = "", children}) {
// estructura dl/dt/dd
    return (
        <div className={`capitalize flex flex-wrap items-center gap-2`}>
            <dt>
                <span title={`${title}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" focusable="false" />
                </span>
                <span className="sr-only">{label}</span>
            </dt>
            <dd className="flex flex-wrap items-center gap-2">
                {children}
            </dd>
        </div>
    );
};


export default InfoItem;
