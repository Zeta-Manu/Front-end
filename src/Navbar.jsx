const Navbar = () => {

    return(
        <div className="fixed w-full z-[100] top-0 left-0">
            <div className="relative bg-white flex gap-1 items-center place-items-center justify-between h-[64px] text-neutral-600">
                <h1 style={{ color: '#622589' }}>Manu</h1>
                <div className="ml-auto">
                    <button>Language</button>
                    <button>Logout</button>
                    <button>Settings</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;